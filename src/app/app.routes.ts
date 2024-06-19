import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

export const routes: Routes = [
    {
        path:"",
        component: SidenavComponent,  
    }
];
