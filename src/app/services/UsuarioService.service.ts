import { Injectable, inject } from '@angular/core';
import { Usuario } from '../models/perfil/Usuario';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/perfil/Rol';
import { API_URL } from './constantes';


@Injectable({
    providedIn: 'root'
})
export class UsuarioService{
  
    usuario:Usuario = new Usuario("","","","",false);
    private token = "";
    
    private httpClient = inject(HttpClient);
    private headers = new HttpHeaders({"Content-Type": "application/json"});
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
    }
    
    buscarUsuario(email:string):Observable<any>{
        return this.httpClient.get(`${API_URL}/api/usuario/email/${email}`,this.httpOptions);
    }

    guardarUsuario(email:string){
        this.buscarUsuario(email).subscribe(
            {next:(response)=>{
                this.usuario.setNombre(response.usuario.nombre);
                this.usuario.setApellido(response.usuario.apellido);
                this.usuario.setEmail(response.usuario.email);
                this.usuario.setContrasenia(response.usuario.contrasenia);
                this.usuario.setEnabled(response.usuario.enabled);
                console.log(this.usuario);
            },
        error:(err) =>{
            console.log(err);
        }
        }
        );
        
    }

    login(email:string, contrasenia:string):Observable<any>{
        const loginData = {
            email:email,
            contrasenia:contrasenia
        };
        return this.httpClient.post(`${API_URL}/login`, loginData,{headers:this.headers});
    }

    guardarToken(token:string){
        this.token = token;
        console.log(this.token);
        this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
    }
}


