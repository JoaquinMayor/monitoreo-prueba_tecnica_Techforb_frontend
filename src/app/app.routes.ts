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
import { RegistroComponent } from './registro/registro.component';
import { loginGuardGuard } from './guards/login-guard.guard';

export const routes: Routes = [
    {
        path:"",
        component: LoginComponent
    },{
        path:"dashboard",
        component:DashboardComponent,canActivate:[loginGuardGuard]
    },
    {
        path:"registrarse",
        component:RegistroComponent
    },
    {
        path:"**",
        component:LoginComponent
    }
];
