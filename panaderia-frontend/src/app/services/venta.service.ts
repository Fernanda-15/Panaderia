import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from "./global";
import { Venta } from "../models/venta";
import { Observable } from "rxjs";

@Injectable()
export class VentaService {

    public url: string;
    constructor(
        public _http: HttpClient

    ) {
        this.url = global.urlApi;
    }


    create(venta:Venta, token: any): Observable<any> {
        let json = JSON.stringify(venta);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').append('token', token);
        console.log(venta);
        return this._http.post(this.url + 'venta', params, { headers: headers });
    }

    public getVentas():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'venta',{headers:httpHeaders});
    }

    public deleteVenta(id:number, token: any) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token', token);
        return this._http.delete(this.url+'venta/'+id,{headers:httpHeaders});
    }

    getVenta(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'venta/'+id , {headers:httpHeaders});
    }

    update(venta:Venta, token: any):Observable<any>{
        let json=JSON.stringify(venta);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token',token);
        return this._http.put(this.url+'venta/'+venta.id,params,{headers:httpHeaders});
    }

    getUltimo():Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'venta/getUltimo' , {headers:httpHeaders});
    }
}