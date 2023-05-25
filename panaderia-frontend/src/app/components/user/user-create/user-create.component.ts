import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import{Router,ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [
    UserService]
})
export class UserCreateComponent implements OnInit {

  public user:User;
  public reset=false;
  public users:any[]=[];
  constructor(
    private _userService: UserService,
    private _router:Router,
  ) {
    this.user = new User(0,"","","vend","");
   }



  ngOnInit(): void {
    console.log('COMPONENTE DE REGISTRO');
   
  }

  showModal(){
   
  }

  onSubmit(form:any){
   console.log(this.user);
    this._userService.registro(this.user).subscribe(
        response=>{
         console.log(response);
           if(response.status == "success"){
             form.reset();
             Swal.fire({
              title: 'Exito!',
              text: 'El usuario se agreó con exito',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
             this._router.navigate(['/user-list']);
   
            }
          },
         error=>{
           console.log(<any>error);
           Swal.fire({
            title: 'Error!',
            text: 'Intente de nuevo',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
   
         }
      );
    
   
  }

  
  


 }


