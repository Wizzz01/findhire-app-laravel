<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sender_id')->constrained('users')->cascadeOnDelete(); // Sender's user ID
            $table->foreignId('receiver_id')->constrained('users')->cascadeOnDelete(); // Receiver's user ID
            $table->foreignId('job_post_id')->nullable()->constrained()->cascadeOnDelete(); // Optional job post ID
            $table->text('message'); // Message content
            $table->boolean('is_read')->default(false); // Message read status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
