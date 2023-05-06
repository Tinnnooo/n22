<?php

namespace App\Models;

use App\Models\Form;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Response extends Model
{
    use HasFactory;

    protected $fillable = [
        "form_id",
        "user_id",
        "date"
    ];

    public function form(){
        return $this->belongsTo(Form::class);
    }
}
