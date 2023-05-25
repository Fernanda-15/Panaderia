<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class JwtAuth{

    private $key; //llave privada de nuestra aplicacion
    ///
    ///CONSTRUCTOR DE LA CLASE, CONTIENE LA LLAVE UNICA
    ///
    function __construct() //inicializa llave
    {
        $this->key='23und2end023r02dn';
        //esta llave es unica
    }

    ///
    ///FUNCION INICIAR SESION, GENERA UNA IDENTIDAD DEL USUARIO
    ///
    public function signin($nombre,$contrasena){ //GENERA EL TOKEN PARA UN USUARIO AUTENTICADO
        //entrar login cifrar token, verifica user password
        $user=User::where([ //hace el select,mueve a primer registro
            //asigna valor a user del bd, si user viene vacio no lo encontro
            'nombre'=>$nombre,
            'contrasena'=>hash('sha256',$contrasena)
        ])->first();
        if(is_object($user)){
            $token=array(
                'sub'=>$user->id,
                'nombre' => $user->nombre,
                'rol' => $user->rol,
                'contrasena' => $user->contrasena,
                'iat'=>time(), //creacion de token , time devuelve tiempo
                'exp'=>time()+3000//tiempo de expiracion //500

            );
            $data=JWT::encode($token,$this->key,'HS256');//token . llave.alg cifrado
        }else{
            $data=array(
                'status'=>'error',
                'code'=>401,
                'message'=>'Datos de autenticación incorrectos'
            );
        }
        return $data; //trabaja manera interna
        //por eso devuelve arreglo porque solo trabaja en controladores
    }

    ///
    ///VERIFICA EL TOKEN INGRESADO
    ///
    public function verify($token,$getIdentity=false){ // verifica token y devuelve cifrado si es verdadero
        $auth=false;
        try{
            $decoded=JWT::decode($token,$this->key,['HS256']);
        }catch(\UnexpectedValueException $ex){
            $auth=false;
        }
        catch(\DomainException $ex){
            $auth=false;
        }
        if(!empty($decoded)&&is_object($decoded)&&isset($decoded->sub)){ //si trae todo devuelve true
            $auth=true;
        }
        if($getIdentity){
            return $decoded;
        }
        return $auth;
    }

}

?>
