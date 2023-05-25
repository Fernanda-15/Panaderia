import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import {Producto} from '../../../models/producto';
import{Router,ActivatedRoute} from '@angular/router';
import{global} from '../../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-update',
  templateUrl: './producto-update.component.html',
  styleUrls: ['./producto-update.component.css'],
  providers:[ProductoService,
              UserService]
})
export class ProductoUpdateComponent implements OnInit {

  public producto:Producto;
  public url:string;

  constructor(
    private _productoService:ProductoService, 
    private _router:Router,
    private _route:ActivatedRoute,
    private _userService: UserService
    ) {
    this.url=global.urlApi;  
    this.producto=new Producto(0,0,"","",0,0,0);
  }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(){
    this._route.params.subscribe(params=>{
    let id=params['id'];
      console.log(id);
      this._productoService.getProducto(id,).subscribe(
        response=>{
          if(response.status=='success'){
            this.producto=response.data;
            console.log(this.producto);
          }else{
            this._router.navigate(['']);
          }
        },
        error=>{
         this._router.navigate(['']); 
        }
      );
    });
  }

  onSubmit(form:any):void{
    
    let token = this._userService.getToken(); 
    this._productoService.update(this.producto,token).subscribe(
      response=>{
     if(response.code==200){
      Swal.fire({
        title: 'Exito!',
        text: 'El producto se modificó con exito',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this._router.navigate(['/producto-list']);
      }
      },

      error=>{
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'No se modificó el producto',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );

  }
}
