import { Component } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { PlantasComponent } from '../plantas/plantas.component';
import { LecturasComponent } from '../lecturas/lecturas.component';
import { GlobalComponent } from '../global/global.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent, NavBarComponent, PlantasComponent, LecturasComponent, GlobalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
