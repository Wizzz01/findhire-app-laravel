<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPost extends Model
{
    use HasFactory;

    // Define the relationship with User (JobPost belongs to User)
    public function user()
    {
        return $this->belongsTo(User::class, 'hr_id');
    }

    // Define the relationship with Application (JobPost has many Applications)
    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    protected $fillable = [
        'job_title',
        'description',
        'job_requirements',
        'Salary',
        'hr_id',
    ];
}
