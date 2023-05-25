import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { global } from "./global";
import { Producto } from "../models/producto";
import { Observable } from "rxjs";

@Injectable()
export class ProductoService {

    public url: string;

    constructor(
        public _http: HttpClient

    ) {

        this.url = global.urlApi;

    }


    create(producto: any, token: any): Observable<any> {
        let json = JSON.stringify(producto);
        let params = 'json=' + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').append('token', token);
        console.log(producto);
        return this._http.post(this.url + 'producto', params, { headers: headers });
    }

    public getProductos():Observable<any>{
        let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'producto',{headers:httpHeaders});
    }

    public deleteProducto(id:number, token: any) : Observable<any>{
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token',token);
        return this._http.delete(this.url+'producto/'+id,{headers:httpHeaders});
    }

    getProducto(id:number):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'producto/'+id , {headers:httpHeaders});
    }

    update(producto:Producto, token: any):Observable<any>{
        let json=JSON.stringify(producto);
        let params='json='+json;
        let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token',token);
        return this._http.put(this.url+'producto/'+producto.id,params,{headers:httpHeaders});
    }

    
    public buscar(valor:any):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'producto/buscar/'+valor , {headers:httpHeaders});
    }

    public buscarC(valor:any):Observable<any>{
        let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        return this._http.get(this.url+'producto/buscarC/'+valor , {headers:httpHeaders});
    }
}