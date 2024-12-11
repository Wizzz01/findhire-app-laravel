<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ApplicationController extends Controller
{
    public function storeApplication(Request $request)
    {
        // Validate the incoming data
        $request->validate([
            'resume' => 'required|file|mimes:pdf|max:10240', // Example validation for resume file
            'job_post_id' => 'required|exists:job_posts,id',
            'reason' => 'required|string|max:1000',
        ]);

        if ($request->hasFile('resume') && $request->file('resume')->isValid()) {
            // Store the resume
            $resumePath = $request->file('resume')->store('/public/resumes', 'public');
            $resumeFileName = basename($resumePath);

            // Create the application record in the database
            Application::create([
                'user_id' => Auth::id(),
                'job_post_id' => $request->input('job_post_id'),
                'resume' => $resumeFileName,
                'status' => 'pending',
                'reason' => $request->input('reason'),
            ]);

            return response()->json(['message' => 'Application submitted successfully!']);
        }

        return response()->json(['error' => 'Failed to submit application'], 400);
    }

    public function updateStatus(Request $request, $id)
    {
        $application = Application::findOrFail($id);

        // Validate the status input
        $status = $request->input('status');
        if (!in_array($status, ['hired', 'rejected', 'pending'])) {
            return response()->json(['error' => 'Invalid status'], 400);
        }

        // Update the status
        $application->status = $status;
        $application->save();

        return response()->json(['message' => 'Status updated successfully']);
    }
    public function downloadResume($applicationId)
{
    $application = Application::findOrFail($applicationId);
    $resumePath = $application->resume;

    Log::info('Attempting to download: ' . $resumePath);

    if (Storage::exists('public/resumes/' . $resumePath)) {
        return Storage::download('public/resumes/' . $resumePath);
    }

    return response()->json(['error' => 'File not found'], 404);
}


}

