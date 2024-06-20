import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { GlobalComponent } from './global/global.component';
import { PlantasComponent } from './plantas/plantas.component';
import { LecturasComponent } from './lecturas/lecturas.component';
import { CrearPlantaComponent } from './crear-planta/crear-planta.component';
import { EditarPlantaComponent } from './editar-planta/editar-planta.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:"",
        component: DashboardComponent,  
    },{
        path:"main",
        component:LoginComponent
    }
];
