import { Component, OnInit } from '@angular/core';
import { Venta } from '../../../models/venta';
import { VentaService } from '../../../services/venta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ReporteService } from 'src/app/services/reporte.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Reporte } from 'src/app/models/reporte';
import { Producto } from 'src/app/models/producto';
import { Detalle } from 'src/app/models/detalle';
import { DetalleService } from 'src/app/services/detalle.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-venta-create',
  templateUrl: './venta-create.component.html',
  styleUrls: ['./venta-create.component.css'],
  providers: [
    VentaService,
    UserService,
    ProductoService,
    ReporteService,
    DetalleService
  ]
})
export class VentaCreateComponent implements OnInit {

  public venta: Venta;
  public users: any[] = [];
  public productos: any[] = [];
  public productitos: any[] = [];
  public identity: any;
  public hoy = new DatePipe('en-US');
  public reporte: Reporte;
  public producto: Producto;
  public detalle: Detalle;
  public detalles: any[] = [];
  public desde: number = 0;
  public hasta: number = 4;
  public buscar: any;
  public cont: number = 0;

  constructor(
    private _ventaService: VentaService,
    private _productoService: ProductoService,
    private _reporteService: ReporteService,
    private _router: Router,
    private _userService: UserService,
    private _detalleService: DetalleService,
  ) {
    this.venta = new Venta(0, 0, 0, "");
    this.reporte = new Reporte(0, "");
    this.producto = new Producto(0, 0, "", "", 0, 0, 0);
    this.detalle = new Detalle(0, 0, 0, 0);
  }

  ngOnInit(): void {

    this.identity = this._userService.getIdentity();
    this.getProductos();
  }


  getProductos() {
    this._productoService.getProductos().subscribe(
      response => {
        console.log(response);
        this.productos = response.data;
      },
      error => {
        this.productos = [];
        console.log("Error");
      }
    );
  }

  mas(id: number) {
    let tot = 0;
    for (let i in this.productitos) {
      if (this.productitos[i].id == id) {

        if ((this.productitos[i].cantidad_inve - 1) >= this.productitos[i].cantidad) { //verifica inventario
          this.productitos[i].cantidad = this.productitos[i].cantidad + 1;
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'No hay suficientes productos en el inventario',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }

      }
    }
    this.total();
  }

  menos(id: number) {
    for (let i in this.productitos) {
      if (this.productitos[i].id == id) {
        this.productitos[i].cantidad = this.productitos[i].cantidad - 1;
        if (this.productitos[i].cantidad == 0) {
          this.delete(this.productitos[i]);
        }

      }
    }
    this.total();

  }


  loadTabla(producto: Producto) {
    console.log("PRODUCTO AÑADIR", producto);
    this.producto = producto;
    if (this.producto.cantidad_inve >= 1) { //Verificar que al menos exista 1

      if (this.existe() == false) {
        Swal.fire({
          title: 'Error!',
          text: 'El producto ya se encuentra en su venta',
          icon: 'error',
          confirmButtonText: 'Ok'
        });

      } else {
        this.producto.cantidad = 1;
        this.productitos.push(this.producto);

      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'No cuenta con el producto en inventario',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }

    this.total();

    console.log("PRODUCTOS", this.productitos);


  }


  total() {
    this.venta.total = 0;
    let sub = 0;
    for (let i in this.productitos) {
      sub = this.productitos[i].cantidad * this.productitos[i].precio;
      this.venta.total = this.venta.total + sub;
    }
  }

  delete(id: number) {

    let indice: any;

    Swal.fire({
      title: '¿Desea eliminar el producto de la venta?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        indice = this.productitos.indexOf(id);
        this.productitos.splice(indice, 1);
        this.total();
        Swal.fire({
          title: 'Exito!',
          text: 'El producto se eliminó de la venta',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      } else {
        for (let i in this.productitos) {
          if (this.productitos[i] == id) {
            this.productitos[i].cantidad = 1;
          }
        }

      }


    })

  }

  getUltimo(): any {
    this._ventaService.getUltimo().subscribe(
      response => {
        if (response.code == 200) {
          this.venta = response.data;
          this.reporte.fecha = this.venta.fecha;

          this.reporteC();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  reporteC() {
    let token = this._userService.getToken(); //TRAER TOKEN PARA AÑADIR

    //VERIFICAR
    console.log("ACA", this.reporte.fecha)

    this._reporteService.fecha(this.reporte.fecha).subscribe(
      response => {
        console.log(response);
        if (response.data.length != 0) {

          console.log("EXITE")

          //CREAR DETALLE
          this.getUltimoR();

        } else {
          //CREAR REPORTE
          this._reporteService.create(this.reporte, token).subscribe(
            response => {
              console.log(response);
              if (response.status == "success") {

                //CREAR DETALLE
                this.getUltimoR();

              }
            },
            error => {
              console.log(<any>error);


            }
          );
        }
      },
      error => {
        console.log(<any>error);
        console.log(error.status);

      }
    );


  }

  getUltimoR() {
    this._reporteService.getUltimo().subscribe(
      response => {
        if (response.code == 200) {
          this.reporte = response.data; //Recibe ultimo
          this.detalle.reporte_id = this.reporte.id; //Asigna ID 
          console.log("ULTIMO R");
          this.getDetalles(this.detalle.reporte_id);

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  crearDetalle() { //CAMBIAR Y CREAR PDF
    console.log("DETALLES", this.detalles);
    let token = this._userService.getToken(); //TOKEN
    console.log("CREAR DETALLE");
    //FOR PARA CREAR DETALLES
    console.log("PRODUCTITOS", this.productitos);
    for (let i in this.productitos) {
      let existe = 0;
      console.log("I", i);
      //Asignar producto ID
      this.detalle.producto_id = this.productitos[i].id;
      //Verificar si hay detalles
      if (this.detalles.length != 0) {
        for (let d in this.detalles) { //for de detalles para verificar si dentro de los reportes existentes esta el producto 
          if (this.detalles[d].producto_id == this.productitos[i].id) {
            existe = 1;
            //MODIFICA CANTIDAD
            this.detalles[d].cantidad = this.detalles[d].cantidad + this.productitos[i].cantidad;
            this._detalleService.update(this.detalles[d], token).subscribe(
              response => {
                console.log(response);

                //MODIFICAR CANTIDAD EN INVENTARIO
                console.log("CANTI ANTES: ", this.productitos[i].cantidad_inve);
                this.productitos[i].cantidad_inve = this.productitos[i].cantidad_inve - this.productitos[i].cantidad;
                console.log("CANTI DESPUES: ", this.productitos[i].cantidad_inve);
                this._productoService.update(this.productitos[i], token).subscribe(
                  response => {
                    console.log(response);


                  },
                  error => {
                    console.log(<any>error);
                  }
                );


              },
              error => {
                console.log(<any>error);
              }
            );
          }
        }

        if (existe == 0) {
          //Asignar cantidad 
          this.detalle.cantidad = this.productitos[i].cantidad;
          //CREAR DETALLE
          this._detalleService.create(this.detalle, token).subscribe(
            response => {
              console.log(response);
              if (response.status == "success") {
                console.log("SE CREO EL DETALLE");
                //MODIFICAR CANTIDAD EN INVENTARIO
                this.productitos[i].cantidad_inve = this.productitos[i].cantidad_inve - this.productitos[i].cantidad;
                this._productoService.update(this.productitos[i], token).subscribe(
                  response => {
                    console.log(response);

                  },
                  error => {
                    console.log(<any>error);
                  }
                );

              }
            },
            error => {
              console.log(<any>error);
            }
          );
        }
      } else { //SI NO HAY DETALLES CREADOS 
        //Asignar cantidad 
        this.detalle.cantidad = this.productitos[i].cantidad;
        //CREAR DETALLE
        this._detalleService.create(this.detalle, token).subscribe(
          response => {
            console.log(response);
            if (response.status == "success") {
              console.log("SE CREO EL DETALLE");
              //MODIFICAR CANTIDAD EN INVENTARIO
              this.productitos[i].cantidad_inve = this.productitos[i].cantidad_inve - this.productitos[i].cantidad;
              this._productoService.update(this.productitos[i], token).subscribe(
                response => {
                  console.log(response);

                },
                error => {
                  console.log(<any>error);
                }
              );

            }
          },
          error => {
            console.log(<any>error);
          }
        );
      }
    }
    Swal.fire({
      title: 'Exito!',
      text: 'La venta se realizó con exito',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
    this._router.navigate(['/venta-list']);

  }


  getDetalles(id: number) {

    this._reporteService.getDetalles(id).subscribe(
      response => {
        console.log(response);
        this.detalles = response.data;
        this.crearDetalle();
      },
      error => {
        console.log("Error");
      }
    );
  }

  onSubmit(form: any) {
    this.venta.user_id = this.identity.sub;
    console.log(this.venta);

    let token = this._userService.getToken(); //TRAER TOKEN PARA AÑADIR
    //VERIFICAR CARRITO VACIO
    if (this.venta.total != 0) {

      this._ventaService.create(this.venta, token).subscribe(
        response => {
          console.log(response);
          if (response.status == "success") {

            //ULTIMA VENTA
            this.getUltimo();

          }
        },
        error => {
          console.log(<any>error);
          Swal.fire({
            title: 'Error!',
            text: 'No se agregó la venta',
            icon: 'error',
            confirmButtonText: 'Ok'
          });

        }
      );

    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Debe añadir productos a la venta',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }



  }

  buscarC(cod: any) {
    let cont = 0;
    console.log("COD BUSCAR", cod);
    this._productoService.buscarC(cod).subscribe(
      response => {
        if (response.status == "success") {
          console.log(response);
          this.producto = response.data;
          console.log("PRODUCTO ENCO", this.producto);
          this.loadTabla(this.producto);

        }

      },

      error => {
        Swal.fire({
          title: 'Error!',
          text: 'No se encontró el producto',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }


    );

  }

  buscarN(nombre: any) {
    console.log("PRODUCTO", nombre);
    if (nombre != " ") {
      this._productoService.buscar(nombre).subscribe(
        response => {
          this.producto.nombre = " ";
          if (response.status == "success") {
            console.log(response);
            this.productos = response.data;
            if (this.productos.length == 0) {
              console.log("COINCIDENCIAS: ", this.productos);
              this.reiniciar();
              Swal.fire({
                title: 'Error!',
                text: 'No se encontró el producto',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
            }
          }
        }
      );
    }
  }

  existe(): any {
    this.cont = 0;
    for (let p in this.productitos) {
      if (this.productitos[p].id == this.producto.id) {
        this.cont = this.cont + 1;
      }
    }
    if (this.cont == 0) {
      return true;
    } else {
      return false;
    }

  }

  reiniciar() {
    console.log("REINICIO: ");
    this.producto.nombre = " ";
    console.log("DESPUES ", this.producto);
  }

  limpiar() {
    Swal.fire({
      title: '¿Desea eliminar TODOS los productos de la venta?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        let tam = this.productitos.length;
        this.productitos.splice(0, tam);
        this.total();

        Swal.fire({
          title: 'Exito!',
          text: 'Se eliminaron los productos de la venta',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }


    })
  }

  cambiarpagina(e: PageEvent) {
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;

  }



}