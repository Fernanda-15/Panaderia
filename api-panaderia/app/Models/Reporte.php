<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reporte extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha'
    ];

    
    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL


    public function detalles(){
        return $this->hasMany('App\Models\Detalle');
    }
}

