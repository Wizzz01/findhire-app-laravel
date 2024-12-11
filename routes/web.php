<?php
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobPostController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => [
            'user' => Auth::user(), // Include auth user data
        ],
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'canRegisterHR' => Route::has('registerHR'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('Home');

Route::get('/Home', [JobPostController::class, 'index'])->name('Home');


// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Register HR
Route::get('/registerHR', [RegisteredUserController::class, 'create'])
    ->name('registerHR');

// Authenticated user routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Job-related routes
Route::middleware(['auth'])->group(function () {
    Route::get('/createJob', [JobController::class, 'create'])->name('createJob');
    Route::get('/findJob', [JobController::class, 'find'])->name('findJob');
    Route::get('/job-posts/create', [JobPostController::class, 'create'])->name('job-posts.create');
    Route::post('/job-posts', [JobPostController::class, 'store'])->name('job-posts.store');
    Route::get('/job-posts/{id}', [JobPostController::class, 'show'])->name('job-posts.show');
    // In routes/web.php or routes/api.php
    Route::post('/applications', [ApplicationController::class, 'storeApplication']);
    Route::patch('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);
    Route::get('/applications/{applicationId}/download-resume', [ApplicationController::class, 'downloadResume']);


});

Route::get('resumes/{filename}', function ($filename) {
    $path = storage_path('app/public/resumes/' . $filename);

    if (file_exists($path)) {
        return response()->download($path);
    }

    return abort(404);
});

// Include auth routes
require __DIR__.'/auth.php';
