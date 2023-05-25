import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { global } from '../../../services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
  providers: [UserService]
})
export class UserUpdateComponent implements OnInit {

  public user: any;
  public url: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.url = global.urlApi;
  }

  ngOnInit(): void {
    this.user = new User(0, "", "", "", "");
    this.getUser();
  }

  getUser() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      console.log(id);
      this._userService.getUser(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.user = response.data;
            console.log(this.user);
          } else {
            this._router.navigate(['']);
          }
        },
        error => {
          this._router.navigate(['']);
        }
      );
    });
  }

  onSubmit(form: any): void {
    this._userService.update(this.user).subscribe(
      response => {
        if (response.code == 200) {
          Swal.fire({
            title: 'Exito!',
            text: 'El usuario se modificó con exito',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this._router.navigate(['/user-list']);
        }
      },

      error => {
        console.log(error);
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
