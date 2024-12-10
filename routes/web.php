<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobPostController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'canRegisterHR' => Route::has('registerHR'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/registerHR', [RegisteredUserController::class, 'create'])
    ->name('registerHR');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/createJob', [JobController::class, 'create'])->name('createJob');
    Route::get('/findJob', [JobController::class, 'find'])->name('findJob');
});

Route::middleware(['auth'])->group(function () {
    // Job post creation route
    Route::get('/job-posts/create', [JobPostController::class, 'create'])->name('job-posts.create');
    Route::post('/job-posts', [JobPostController::class, 'store'])->name('job-posts.store');
});
require __DIR__.'/auth.php';
