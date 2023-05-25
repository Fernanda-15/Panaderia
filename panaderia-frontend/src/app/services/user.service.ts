import { Inject, Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "./global";
import { User } from "../models/user";

@Injectable()
export class UserService{

    public url: string;
    public identity:any;
    public token:any;

    constructor(public _http:HttpClient){
        this.url = global.urlApi;
        this.token=this.getToken();
    }

    registro(user:any) : Observable<any>{
      let json = JSON.stringify(user);
      let params = 'json='+json;
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').append('token',this.token);
    console.log(user);
      return this._http.post(this.url+'user', params, {headers: headers});
  }

  public getUsers():Observable<any>{
      //console.log(this.token);
      let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded');//.append('token',this.token)
      return this._http.get(this.url+'user',{headers:httpHeaders});
  }

  public deleteUser(id:number) : Observable<any>{
      let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token',this.token);
      return this._http.delete(this.url+'user/'+id,{headers:httpHeaders});
  }

  getUser(id:number):Observable<any>{
      let httpHeaders =new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.get(this.url+'user/'+id , {headers:httpHeaders});
    }

  update(user:User):Observable<any>{
      let json=JSON.stringify(user);
      let params='json='+json;
      let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded').append('token',this.token);
      return this._http.put(this.url+'user/'+user.id,params,{headers:httpHeaders});
    }

   signin(user:User,gettoken=null):Observable<any>{
      if(gettoken != null){
          user.gettoken = 'true';
      }
      let json=JSON.stringify(user);
      let params='json='+json;
      let httpHeaders=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
      return this._http.post(this.url+'user/login',params,{headers:httpHeaders});
  }

  public getToken(){
      let tk=localStorage.getItem('token');
      if(tk && tk!='undefined'){
        this.token=tk.trim();
      }else{
        this.token=null;
      }
      return this.token;
    }
  
    public getIdentity(){
      let idTemp=localStorage.getItem('identity');
      if(idTemp && idTemp!='undefined'){
        this.identity=JSON.parse(idTemp);
      }else{
        this.identity=null;
      }
      return this.identity;
    }
    public loadIdentity(){
      let httpHeaders =new HttpHeaders().append('Content-Type','application/x-www-form-urlencoded').append('token',this.token);
      console.log(httpHeaders);
      return this._http.post(this.url+'user/getidentity',null,{headers:httpHeaders});
    }
    
}