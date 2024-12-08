<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view (same for both HR and Applicant).
     */
    public function create(Request $request): Response

    {
        if ($request->is('registerHR')) {
            return Inertia::render('Auth/RegisterHR');
        }
        else{
            Inertia::render('Auth/Register');
        }

        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request for both HR and Applicant.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Validate incoming data
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|string|in:Applicant,HR', // Ensure role is either Applicant or HR
        ]);

        // Create user with the role specified in the request
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role, // Set the role based on request
        ]);

        // Fire Registered event
        event(new Registered($user));

        // Log in the newly registered user
        Auth::login($user);

        // Redirect to the dashboard or a different page
        return redirect(route('dashboard', absolute: false));
    }
}
