import { Injectable, inject } from '@angular/core';
import { Usuario } from '../models/perfil/Usuario';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/perfil/Rol';
import { API_URL } from './constantes';


@Injectable({
    providedIn: 'root'
})
//Servicio que consume la api de usuarios-
export class UsuarioService{
    //Variable destinada a guardar la información del usuario loguedo.
    usuario:Usuario = new Usuario("","","","",false);
    //Variable que almacena el token si el logueo es exitoso.
    private token = "";
    //Inyección del httpClient
    private httpClient = inject(HttpClient);
    //Headers para links donde no se necesitan permisos especiales como el login o registrarse.
    private headers = new HttpHeaders({"Content-Type": "application/json"});
    //Headers con la autorización del token.
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
          })
    }
    //Creación de un nuevo usuario en la base de datos.
    registrarse(usuario:Usuario){
        return this.httpClient.post(`${API_URL}/api/usuario`,usuario,{headers:this.headers}).subscribe();
    }
    //Verifica si se encuentra logueado.
    estaLogueado(){
        return this.token != "";
    }
    //Verifica si el usuario se encuentra en la base de datos
    existeUsuario(email:string){
        console.log(email);
        return this.httpClient.get<any>(`${API_URL}/api/usuario/existe/${email}`);
    }
    //Busca un usuario por su email.
    buscarUsuario(email:string):Observable<any>{
        return this.httpClient.get(`${API_URL}/api/usuario/email/${email}`,this.httpOptions);
    }
    //Almacena los datos de un usuario.
    async guardarUsuario(email:string){
        await this.buscarUsuario(email).subscribe(
            {next:(response)=>{
                this.usuario.setNombre(response.usuario.nombre);
                this.usuario.setApellido(response.usuario.apellido);
                this.usuario.setEmail(response.usuario.email);
                this.usuario.setContrasenia(response.usuario.contrasenia);
                this.usuario.setEnabled(response.usuario.enabled);
            },
        error:(err) =>{
            console.log(err);
        }
        }
        );
        
    }
    //Loguea al usuario y devuelve un token de seguridad.
     login(email:string, contrasenia:string):Observable<any>{
        localStorage.setItem("token","0");
        localStorage.setItem("log", "false");
    
        const loginData = {
            email:email,
            contrasenia:contrasenia
        };
         return this.httpClient.post(`${API_URL}/login`, loginData,{headers:this.headers});
    }
    //Almacena y actualiza la información del token generado en el login.
    async guardarToken(token:string){
        this.token = token;
        console.log(this.token);
        this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            })
          };
          localStorage.setItem("token", this.token);
          localStorage.setItem("log", "true");
         
    }
    //Desloguea a un usuario de la aplicación.
    logout(){
        this.usuario = new Usuario("","", "", "", false);
        this.token = "";
        localStorage.setItem("token","0");
        localStorage.setItem("log", "false");
    }
}


