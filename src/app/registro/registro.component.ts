import { Component, booleanAttribute } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../services/UsuarioService.service';
import { Router } from '@angular/router';
import { Usuario } from '../models/perfil/Usuario';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  hidePassword = true;
  mensaje:string  ="";
  mostrarMensaje = false;
  constructor(private usuarioService:UsuarioService, private router:Router){
  }

  registro = new FormGroup({
    nombre: new FormControl("",[Validators.required]),
    apellido: new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required, Validators.email]),
    contrasenia:new FormControl("",[Validators.required, Validators.minLength(9)])
  });
  
  
  registrarse(){
    console.log("hola")
    console.log( this.registro.get("email")?.value||"");
    this.usuarioService.existeUsuario(this.registro.get("email")?.value||"").subscribe({
      next:(response)=>{
        const existe = response.existe;
        if(!existe){
          const usuario:Usuario = new Usuario(this.registro.get("nombre")?.value||"",
          this.registro.get("apellido")?.value||"",
          this.registro.get("email")?.value||"",
          this.registro.get("contrasenia")?.value||"",
          true);
          this.usuarioService.registrarse(usuario);
          this.router.navigate([""])
        }else{
          this.mostrarMensaje = true;
          this.mensaje = "Ese mail ya se encuentra registrado"
        }

      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
