import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { ReporteService } from 'src/app/services/reporte.service';
import { DatePipe } from '@angular/common';
import { Detalle } from 'src/app/models/detalle';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css'],
  providers: [
    ReporteService,
    DetalleService,
    ProductoService
  ]
})
export class PdfComponent implements OnInit {

  public detalles: any[] = [];
  public detallitos: any[] = []; //TEMPORAL CON NOMBRE DEL PRODUCTO
  public hoyEs: any;
  public hoy = new DatePipe('en-US');
  public productos: any[] = [];
  public totalV: number;
  public pan: number;
  public bebida: number;
  public abarrotes: number;
  

  constructor(
    private _reporteService: ReporteService,
    private _detalleService: DetalleService,
    private _productoService: ProductoService,
    private _route: ActivatedRoute,


  ) {

    this.hoyEs = this.hoy.transform(Date.now(), 'dd/MM/yyyy');
    this.totalV = 0;
    this.pan=0;
    this.bebida=0;
    this.abarrotes=0;

  }
  ngOnInit(): void {
    this.getDetallesByReporte();
  }



  getDetallesByReporte() {

    this._route.params.subscribe(params => {
      let id = params['id'];
      console.log("ID", id);
      this._reporteService.getDetalles(id).subscribe(
        response => {
          this.detalles = response.data;  //asignar detalles
          console.log("DETALLES", this.detalles);


          for (let i in this.detalles) {
            this.getProducto(this.detalles[i]);

          }

          console.log("DETALLITOS", this.detallitos);

        },
        error => {
          console.log(error);
        }
      );
    });

  }

  getProducto(detalle: Detalle) {
    let producto = new Producto(0, 0, "", "", 0, 0, 0);
    this._productoService.getProducto(detalle.producto_id).subscribe(
      response => {
        console.log("NOMBRE", response.data.nombre);
        producto = response.data;
        producto.cantidad = detalle.cantidad;
        this.productos.push(producto);
        this.total(producto);
        console.log("PRODUCTOS", this.productos);
        //this.concatenar(response.data, detalle);

      },
      error => {
        console.log(error);
      }
    );
  }

  total(producto:Producto) {
    this.totalV = this.totalV + (producto.cantidad * producto.precio);

    if(producto.tipo == "Pan"){
      this.pan = this.pan +  (producto.cantidad * producto.precio);
    }

    if(producto.tipo == "Bebidas"){
      this.bebida = this.bebida +  (producto.cantidad * producto.precio);
    }

    if(producto.tipo == "Abarrotes"){
      this.abarrotes = this.abarrotes +  (producto.cantidad * producto.precio);
    }


  }

  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save('Ventas.pdf');
    });


  }

  

} 