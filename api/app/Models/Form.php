<?php

namespace App\Models;

use App\Models\Response;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Form extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "slug",
        "description",
        "limit_one_response",
        "creator_id"
    ];

    public function allowedDomains()
    {
        return $this->hasMany(AllowedDomain::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public function responses()
    {
        return $this->hasMany(Response::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
