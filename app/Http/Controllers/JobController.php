<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class JobController extends Controller
{
    public function create()
    {
        return Inertia::render('createJob'); // Matches your CreateJob.tsx
    }

    public function find()
    {
        return Inertia::render('findJob'); // Matches your FindJob.tsx
    }
}
