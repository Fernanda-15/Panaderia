<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    use HasFactory;

    protected $table = 'ventas'; //SE DEFINE EL NOMBRE DE LA TABLA

    protected $fillable = [
        'user_id',
        'total',
        'fecha'
    ];

    
    public $incrementing = true; //SE SETEA EL AUTOINCREMENTAL


    public function user(){
        return $this->belongsTo('App\Models\User','user_id');
    }

}
