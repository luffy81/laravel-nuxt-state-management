<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Add the fields you want to allow mass assignment on
    protected $fillable = [
        'name',
        'price',
        'category_id',
        'description',
        'image'
    ];
}
