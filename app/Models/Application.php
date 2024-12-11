<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_post_id',
        'user_id',
        'status',
        'resume',
        'reason',
    ];

    // Define relationship with JobPost
    public function jobPost()
    {
        return $this->belongsTo(JobPost::class);
    }

    // Define relationship with User
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
