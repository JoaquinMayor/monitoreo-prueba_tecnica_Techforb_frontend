import { Injectable } from "@angular/core";
import { UsuarioService } from "./UsuarioService.service";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "./constantes";

@Injectable({
    providedIn: 'root'
})
//Servicio para acceder a la información de los sensores.
//Utiliza el UsuarioService para las credenciales y token.
export class SensorService{
    
    constructor(private usuarioService:UsuarioService, private http:HttpClient){}
    //Accede a la cantidad de sensores desabilitados que existen.
    contarSensores(){
        return this.http.get<any>(`${API_URL}/api/sensor/contar`, this.usuarioService.httpOptions);
    }
    
}