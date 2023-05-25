<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Detalle extends Model
{
    use HasFactory;

    protected $table = 'detalles'; //SE DEFINE EL NOMBRE DE LA TABLA

    protected $fillable = [
        'producto_id',
        'reporte_id',
        'cantidad'
    ];

    
    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL


    public function producto(){
        return $this->belongsTo('App\Models\Producto','producto_id');
    }

    public function reporte(){
        return $this->belongsTo('App\Models\Reporte','reporte_id');
    }

}
