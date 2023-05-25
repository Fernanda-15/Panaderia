import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../../services/producto.service';
import {Router,ActivatedRoute} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css'],
  providers: [
    ProductoService,
  UserService]
})
export class ProductoCreateComponent implements OnInit {

  public producto:Producto;
  constructor(
    private _productoService: ProductoService,
    private _router:Router,
    private _userService: UserService
  ) {
    this.producto= new Producto(0,0,"","Pan",0,0,0);
   }

  ngOnInit(): void {

  }

  
  onSubmit(form:any){
    console.log(this.producto);
    let token = this._userService.getToken(); //TRAER TOKEN PARA AÑADIR
     this._productoService.create(this.producto, token).subscribe(
         response=>{
          console.log(response);
            if(response.status == "success"){
              form.reset();
              Swal.fire({
                title: 'Exito!',
                text: 'El producto se agregó con exito',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              this._router.navigate(['/producto-list']);
    
             }
           },
          error=>{
            console.log(<any>error);
            Swal.fire({
              title: 'Error!',
              text: 'No se agregó el producto',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
    
          }
       );
     
    
   }

}
