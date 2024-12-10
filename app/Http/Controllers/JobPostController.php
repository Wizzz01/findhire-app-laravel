<?php

namespace App\Http\Controllers;

use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class JobPostController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'description' => 'required|string',
            'job_requirements' => 'required|string',
            'salary' => 'required|string',
        ]);

        JobPost::create([
            'job_title' => $validated['job_title'],
            'description' => $validated['description'],
            'job_requirements' => $validated['job_requirements'],
            'salary' => $validated['salary'],
            'hr_id' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Job post created successfully!');
    }
}
