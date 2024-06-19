import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "./UsuarioService.service";
import { API_URL } from "./constantes";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class LecturaService{
    constructor(private usuarioService:UsuarioService, private http:HttpClient){}

    contarLecturasOk(){
        return this.http.get(`${API_URL}/api/lectura/lecturasOk`, this.usuarioService.httpOptions);
    }

    contarLecturasMedia(){
        return this.http.get(`${API_URL}/api/lectura/lecturasMedia`, this.usuarioService.httpOptions);
    }

    contarLecturasRoja(){
        return this.http.get(`${API_URL}/api/lectura/lecturasRoja`, this.usuarioService.httpOptions);
    }
}