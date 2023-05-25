<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'nombre',
        'tipo',
        'precio',
        'cantidad_inve'
    ];

    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL

    public function detalles(){
        return $this->hasMany('App\Models\Detalle');
        
    }
}
