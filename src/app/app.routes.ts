import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { GlobalComponent } from './global/global.component';
import { PlantasComponent } from './plantas/plantas.component';
import { LecturasComponent } from './lecturas/lecturas.component';

export const routes: Routes = [
    {
        path:"",
        component: LecturasComponent,  
    }
];
