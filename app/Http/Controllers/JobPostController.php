<?php
namespace App\Http\Controllers;

use App\Models\JobPost;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User; // Ensure this line is present to reference the User model

class JobPostController extends Controller
{
    // Show Home Page with Job Posts
    public function index()
    {
        $jobPosts = JobPost::all(); // Fetch all job posts

        // Use Inertia to render the Home React component
        return Inertia::render('Home', [
            'jobPosts' => $jobPosts, // Pass the job posts to the component
        ]);
    }

    // Show Job Post Details
    public function show($id)
    {
        $jobPost = JobPost::with('user', 'applications.user')->findOrFail($id); // Fetch job post with creator and applicants
        $applications = $jobPost->applications;
        $hrUser = User::find($jobPost->hr_id); // Ensure "User" starts with uppercase

        // Check if the user is HR or an applicant
        if (Auth::check() && Auth::user()->role === 'HR') {
            // HR should see applicants and their status
            return Inertia::render('JobPostDetailHR', [
                'jobPost' => $jobPost,
                'hrUser' => $hrUser,
                'applications' => $applications->map(function ($application) {
                    return [
                        'id' => $application->id,
                        'user' => $application->user,
                        'resume' => $application->resume,
                        'status' => $application->status,
                        'reason' => $application->reason, // Include the reason
                    ];
                }),
            ]);
        }

        // Applicants only see job details and can apply
        return Inertia::render('JobPostDetailApplicant', [
            'jobPost' => $jobPost,
            'hrUser' => $hrUser,
            'canApply' => true, // Allow the applicant to apply
        ]);
    }

    // Apply for a Job
    public function apply(Request $request, $jobId)
    {
        $jobPost = JobPost::findOrFail($jobId);

        // Check if the user is already an applicant
        if ($jobPost->applications()->where('user_id', Auth::id())->exists()) {
            return back()->with('error', 'You have already applied for this job.');
        }

        Application::create([
            'job_post_id' => $jobPost->id,
            'user_id' => Auth::id(),
            'status' => 'pending',
        ]);

        return back()->with('success', 'You have successfully applied for the job.');
    }

    // Store a New Job Post
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'description' => 'required|string',
            'job_requirements' => 'required|string',
            'Salary' => 'required|string',
        ]);

        JobPost::create([
            'job_title' => $validated['job_title'],
            'description' => $validated['description'],
            'job_requirements' => $validated['job_requirements'],
            'Salary' => $validated['Salary'],
            'hr_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Job post created successfully!');
    }

    // Show Job Details for a Specific Job Post
    public function showJobDetails($jobPostId)
    {
        // Use eager loading to get the related user
        $jobPost = JobPost::with('user')->findOrFail($jobPostId);

        return Inertia::render('JobPostDetailHR', [
            'jobPost' => $jobPost,
        ]);
    }
}
