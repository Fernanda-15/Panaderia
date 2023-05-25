import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserUpdateComponent } from './components/user/user-update/user-update.component';
import { ProductoCreateComponent } from './components/producto/producto-create/producto-create.component';
import { ProductoUpdateComponent } from './components/producto/producto-update/producto-update.component';
import { ProductoListComponent } from './components/producto/producto-list/producto-list.component';
import { ReporteListComponent } from './components/reporte/reporte-list/reporte-list.component';
import { VentaListComponent } from './components/venta/venta-list/venta-list.component';
import { VentaCreateComponent } from './components/venta/venta-create/venta-create.component';
import { VentaUpdateComponent } from './components/venta/venta-update/venta-update.component';
import { PdfComponent } from './components/reporte/pdf/pdf.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserCreateComponent,
    UserListComponent,
    UserUpdateComponent,
    ProductoCreateComponent,
    ProductoUpdateComponent,
    ProductoListComponent,
    ReporteListComponent,
    VentaListComponent,
    VentaCreateComponent,
    VentaUpdateComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
  ],
  providers: [ 
    appRoutingProviders,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
