<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\DetalleController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\ReporteController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api')->group(function () { 

    Route::post('/user/login',[UserController::class,'login']);
    Route::post('/user/getidentity',[UserController::class,'getIdentity']);
    //Route::post('/reporte/existeFecha',[ReporteController::class,'existeFecha']);
    Route::get('/reporte/existeFecha/{fecha}',[ReporteController::class,'existeFecha']);
    Route::get('/venta/getUltimo',[VentaController::class,'getUltimo']);
    Route::get('/reporte/getUltimo',[ReporteController::class,'getUltimo']);
    Route::get('/detalle/reporte/{id}',[DetalleController::class,'getDetallesByR']);
    Route::get('/producto/buscar/{valor}',[ProductoController::class,'buscar']);
    Route::get('/producto/buscarC/{valor}',[ProductoController::class,'buscarC']);


    //RUTAS AUTOMATICAS RESTful
    Route::resource('/user', UserController::class,['except'=>['create','edit']]);
    Route::resource('/producto', ProductoController::class,['except'=>['create','edit']]);
    Route::resource('/detalle', DetalleController::class,['except'=>['create','edit']]);
    Route::resource('/venta', VentaController::class,['except'=>['create','edit']]);
    Route::resource('/reporte', ReporteController::class,['except'=>['create','edit']]);

});


