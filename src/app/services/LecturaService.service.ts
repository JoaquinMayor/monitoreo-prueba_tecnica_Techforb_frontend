import { HttpClient, HttpParams } from "@angular/common/http";
import { UsuarioService } from "./UsuarioService.service";
import { API_URL } from "./constantes";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class LecturaService{
    constructor(private usuarioService:UsuarioService, private http:HttpClient){}

    contarLecturasOk(){
        return this.http.get<any>(`${API_URL}/api/lectura/lecturasOk`, this.usuarioService.httpOptions);
    }

    contarLecturasMedia(){
        return this.http.get<any>(`${API_URL}/api/lectura/lecturasMedia`, this.usuarioService.httpOptions);
    }

    contarLecturasRoja(){
        return this.http.get<any>(`${API_URL}/api/lectura/lecturasRoja`, this.usuarioService.httpOptions);
    }

    cantidadPorAlerta(tipoLectura:string, tipoAlerta:string){
        const params = new HttpParams()
      .set('tipoLectura', tipoLectura)
      .set('tipoAlerta', tipoAlerta);
        return this.http.get<any>(`${API_URL}/api/lectura/lecturasPorTipo`,
            {
                params: params,
                headers: this.usuarioService.httpOptions.headers 
            });
    }
}