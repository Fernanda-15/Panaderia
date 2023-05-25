import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.css'],
  providers:[
    ReporteService,
  ] 
})
export class ReporteListComponent implements OnInit {

  public reportes: any[] = [];

  constructor(
    private _reporteService: ReporteService,


  ) { 

  }

  ngOnInit(): void {
    this.getReportes();
  }

  getReportes() {
    this._reporteService.getReportes().subscribe(
      response => {
        console.log(response);
        this.reportes = response.data;
        console.log("REPORTES", this.reportes);
        
      },
      error => {
        this.reportes = [];
        console.log("Error");
      }
    );
  }

 
  

 

}
