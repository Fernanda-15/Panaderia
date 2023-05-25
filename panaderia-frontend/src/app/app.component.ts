import { Component, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    UserService
  ]
})
export class AppComponent {
  title = 'Panaderia';

  public identity: any;
  public token: any;
  private times: number;

  constructor(
    public _userService: UserService,
    private _router: Router,

  ) {
    this.loadStorage();

    this.times = 0;

  }

  public loadStorage() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.times = 0;

  }

  ngDoCheck(): void {
    this.times++;
    if (this.times > 0.1) {
      this.loadStorage();
      this.times = 0;
    }
  }


  cerrar(): void {
    Swal.fire({
      title: 'Cerrar sesión',
      text: "¿Desea cerrar la sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['logout/1']);
        Swal.fire({
          title: 'Sesión cerrada',
          icon: 'success'
        }
        )
      }
    })
  }

}
