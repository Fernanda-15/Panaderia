import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from "./global";
import { Reporte } from "../models/reporte";
import { Observable } from "rxjs";

@Injectable()
export class ReporteService {

    public url: string;
    constructor(
        public _http: HttpClient

    ) {
        this.url = global.urlApi;
    }


    create(reporte:Reporte, token: any): Observable<any> {
        let json = JSON.stringify(reporte);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').append('token', token);
        console.log(reporte);
        return this._http.post(this.url + 'reporte', params, { headers: headers });
    }

    public getReportes():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'reporte',{headers:httpHeaders});
    }

    public deleteReporte(id:number, token: any) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token', token);
        return this._http.delete(this.url+'reporte/'+id,{headers:httpHeaders});
    }

    getReporte(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'reporte/'+id , {headers:httpHeaders});
    }

    update(reporte:Reporte, token: any):Observable<any>{
        let json=JSON.stringify(reporte);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token',token);
        return this._http.put(this.url+'reporte/'+reporte.id,params,{headers:httpHeaders});
    }


    fecha(fecha:any): Observable<any> {
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'reporte/existeFecha/'+fecha, {headers:httpHeaders});
    }

    getUltimo():Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'reporte/getUltimo' , {headers:httpHeaders});
    }

    public getDetalles(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'detalle/reporte/'+id , {headers:httpHeaders});
    }

}