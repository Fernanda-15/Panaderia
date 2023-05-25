import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from "./global";
import { Detalle } from "../models/detalle";
import { Observable } from "rxjs";

@Injectable()
export class DetalleService {

    public url: string;

    constructor(
        public _http: HttpClient

    ) {
        this.url = global.urlApi;

    }


    create(detalle:Detalle, token: any): Observable<any> {
        let json = JSON.stringify(detalle);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').append('token', token);
        console.log(detalle);
        return this._http.post(this.url + 'detalle', params, { headers: headers });
    }

    public getDetalles():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'detalle',{headers:httpHeaders});
    }

    public deleteDetalle(id:number, token: any) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token',token);
        return this._http.delete(this.url+'detalle/'+id,{headers:httpHeaders});
    }

    getDetalle(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'detalle/'+id , {headers:httpHeaders});
    }

    update(detalle:Detalle, token: any):Observable<any>{
        let json=JSON.stringify(detalle);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token',token);
        return this._http.put(this.url+'detalle/'+detalle.id,params,{headers:httpHeaders});
    }

}