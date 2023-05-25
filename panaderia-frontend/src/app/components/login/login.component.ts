import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [
    UserService]
})

export class LoginComponent implements OnInit {

  public status: number;
  public user: User;
  private token: any;
  private identity: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _routes: ActivatedRoute
  ) {

    this.status = -1;
    this.user = new User(0, "", "", "", "");

    if (this.identity = null) {
      this.identity = {
        sub: "null",
        rol: "null"
      }
    }
  }

  ngOnInit(): void {
    this.logout();
  }

  public loadStorage() {
    this.identity = this._userService.getIdentity();
  }

  onSubmit(form: any) {
    this._userService.signin(this.user).subscribe(
      response => {
        if (response.status != "error") {
          this.token = response;
          localStorage.setItem("token", this.token);
          this._userService.getToken();

          this._userService.loadIdentity().subscribe(
            response => {
              this.identity = JSON.stringify(response);
              localStorage.setItem("identity", this.identity);
              this.loadStorage();
              Swal.fire({
                title: '¡Bienvenida!',
                confirmButtonText: 'Ok'
              });
            },
            error => {
              Swal.fire({
                title: 'Error!',
                text: 'Credenciales invalidas',
                icon: 'error',
                confirmButtonText: 'Ok'
              });
              this.identity = null;
            }
          );

          form.reset();
          this._router.navigate(['']);

        }
      },
      error => {
        Swal.fire({
          title: 'Error!',
          text: 'Credenciales invalidas',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }


  logout() {

    this._routes.params.subscribe(
      params => {
        let logout = +params['sure'];
        if (logout == 1) {
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;
          //Redireccion
          this._router.navigate(['login']);
        }
      }
    );
  }

}
