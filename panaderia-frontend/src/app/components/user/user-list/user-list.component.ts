import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { global } from '../../../services/global';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  public user: User;
  public users: any;
  public url: string;
  public times: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.urlApi;
    this.user = new User(1, "", "", "", "");
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this._userService.getUsers().subscribe(
      response => {
        console.log(response);
        this.users = response.data;
      },
      error => {
        this.users = null;
        console.log("Error");
      }
    );
  }




  delete(id: number): void {

    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: "No podrá revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this._userService.deleteUser(id).subscribe(
          response => {
            if (response.status == "success") {
              console.log(response);
              Swal.fire({
                title: 'Exito!',
                text: 'El usuario se eliminó con exito',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
              this.loadUsers();
            }

          },
          error => {
            Swal.fire({
              title: 'Error!',
              text: 'Error al eliminar el usuario',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          }
        );

      }
    })



  }

}
