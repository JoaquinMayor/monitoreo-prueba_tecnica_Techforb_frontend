import { Injectable } from "@angular/core";
import { UsuarioService } from "./UsuarioService.service";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "./constantes";

@Injectable({
    providedIn: 'root'
})

export class SensorService{
    
    constructor(private usuarioService:UsuarioService, private http:HttpClient){}

    contarSensores(){
        return this.http.get<any>(`${API_URL}/api/sensor/contar`, this.usuarioService.httpOptions);
    }
    
}