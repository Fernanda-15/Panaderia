import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { UserService } from 'src/app/services/user.service';
import{global} from '../../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css'],
  providers:[ProductoService,
              UserService]
})
export class ProductoListComponent implements OnInit {
   
  public productos:any;
  public url:string;
  public times: any;

  constructor(
    private _productoService:ProductoService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _userService: UserService
  ) { 
    this.url=global.urlApi;
  }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos():void{
    this._productoService.getProductos().subscribe(
      response=>{
        console.log(response);
        this.productos=response.data;
      },
      error=>{
        this.productos=null;
        console.log("Error");
      }
    );
  }

  
  delete(id:number):void{

    Swal.fire({
      title: '¿Desea eliminar el producto?',
      text: "No podrá revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

    
    let token = this._userService.getToken();     
    this._productoService.deleteProducto(id, token).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);

          Swal.fire({
            title: 'Exito!',
            text: 'El producto se eliminó con exito',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.loadProductos();
          
        }

      },
      error=>{
        
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'El producto no se eliminó',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
        
      }
    })




  }

  


}
