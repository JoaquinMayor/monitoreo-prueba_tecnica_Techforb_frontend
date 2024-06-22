import { Component, HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../services/UsuarioService.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  logueo = new FormGroup({
    email: new FormControl("",[Validators.email, Validators.required]),
    password:new FormControl("",[Validators.required])
  });
  mensaje:string = "";
  hidePassword = true;

  constructor(private usuarioService:UsuarioService, private router:Router){}

  async login(){
    localStorage.setItem("email",this.logueo.get("email")?.value || "")
    await this.usuarioService.login(this.logueo.get("email")?.value || "", this.logueo.get("password")?.value ||"")
    .subscribe({next:async (response) => {
      await this.usuarioService.guardarToken(response.token);
      await this.usuarioService.guardarUsuario(response.email);
      this.router.navigate([""]);
    },
    error:(err)=>{
        this.mensaje = "Email o contraseña incorrectos";
    }
  
    })
   
  }



}
