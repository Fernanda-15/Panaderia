import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { VentaService } from '../../../services/venta.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-venta-list',
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.css'], 
  providers: [
    VentaService,
    UserService
  ]
})
export class VentaListComponent implements OnInit {

  public ventas: any[] = [];
  public user:User;
  public hoy = new DatePipe('en-US');
  public hoyEs :any;

  constructor(
    private _ventaService: VentaService,
    private _userService: UserService,

    ) { 
      this.user = new User(0,"","","","");
      this.hoyEs = this.hoy.transform(Date.now(), 'yyyy-MM-dd');
      console.log("hoyEs", this.hoyEs);

    }

  ngOnInit(): void {
    this.getUser();
  }

  getVentas(){
    this._ventaService.getVentas().subscribe(
      response => {
        console.log(response);
        this.ventas = response.data;
        console.log("VENTAS", this.ventas);
      },
      error => {
        this.ventas = [];
        console.log("Error");
      }
    );
  }

  getUser(){
    let identity = this._userService.getIdentity();
    this.user.id = identity.sub;
    this.user.rol = identity.rol;
    console.log("USUARIO", this.user);
    
    this.getVentas();
  }

  delete(id:any){
    //CAMBIAR REPORTE Y DETALLE AL ELIMINAR
    Swal.fire({
      title: '¿Desea eliminar la venta?',
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
    this._ventaService.deleteVenta(id, token).subscribe(
      response=>{
        if(response.status=="success"){
          console.log(response);

          Swal.fire({
            title: 'Exito!',
            text: 'La venta se eliminó con exito',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.getVentas();
          
        }

      },
      error=>{
        
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'La venta no se eliminó',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
        
      }
    })
  }
}
