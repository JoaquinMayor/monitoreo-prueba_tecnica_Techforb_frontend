import { Component } from '@angular/core';
import { UsuarioService } from '../services/UsuarioService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  
  constructor(private usuarioService:UsuarioService, private router:Router){}
  logOut(){
    this.usuarioService.logout();
    this.router.navigate([""]);
  }

}
