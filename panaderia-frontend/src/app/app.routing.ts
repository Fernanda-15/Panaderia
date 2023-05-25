//IMPORTS NECESARIOS
import { ModuleWithProviders } from "@angular/core";
import {Routes,RouterModule} from '@angular/router';

//IMPORTAR COMPONENTES
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent} from './components/home/home.component';

//USUARIO
import { UserCreateComponent } from './components/user/user-create/user-create.component';
import { UserListComponent} from './components/user/user-list/user-list.component';
import { UserUpdateComponent} from './components/user/user-update/user-update.component';

//PRODUCTO
import { ProductoCreateComponent } from "./components/producto/producto-create/producto-create.component";
import { ProductoUpdateComponent } from "./components/producto/producto-update/producto-update.component";
import { ProductoListComponent } from "./components/producto/producto-list/producto-list.component";

//VENTA
import { VentaCreateComponent } from "./components/venta/venta-create/venta-create.component";
import { VentaUpdateComponent } from "./components/venta/venta-update/venta-update.component";
import { VentaListComponent } from "./components/venta/venta-list/venta-list.component";   

//REPORTE
import { ReporteListComponent } from "./components/reporte/reporte-list/reporte-list.component";
import { PdfComponent } from "./components/reporte/pdf/pdf.component";


//DEFINIR RUTAS
const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'inicio/:id',component:HomeComponent},
    {path: 'login',component:LoginComponent},
    {path: 'logout/:sure',component:LoginComponent},

    {path: 'user-create',component:UserCreateComponent},
    {path: 'user-list',component:UserListComponent},
    {path: 'user-update/:id',component:UserUpdateComponent},

    {path: 'producto-create' , component:ProductoCreateComponent},
    {path: 'producto-update/:id' , component:ProductoUpdateComponent},
    {path: 'producto-list' , component:ProductoListComponent},

    {path: 'venta-create' , component:VentaCreateComponent},
    {path: 'venta-update/:id' , component:VentaUpdateComponent},
    {path: 'venta-list' , component:VentaListComponent},
    
    {path: 'reporte-list' , component:ReporteListComponent},
    {path: 'pdf/:id' , component:PdfComponent},
    
];

//EXPORTAR CONFIG
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);
