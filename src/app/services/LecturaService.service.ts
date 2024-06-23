import { HttpClient, HttpParams } from "@angular/common/http";
import { UsuarioService } from "./UsuarioService.service";
import { API_URL } from "./constantes";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
//Servicio que accede a la información de las lecturas.
//Utiliza el UsuarioService y el HttpClient
export class LecturaService{
    constructor(private usuarioService:UsuarioService, private http:HttpClient){}
    //Método que accede a la cantidad de lecturas ok.
    contarLecturasOk(){
        return this.http.get<any>(`${API_URL}/api/lectura/lecturasOk`, this.usuarioService.httpOptions);
    }
    //Método que accede a la cantidad de lecturas medias.
    contarLecturasMedia(){
        return this.http.get<any>(`${API_URL}/api/lectura/lecturasMedia`, this.usuarioService.httpOptions);
    }
    //Método que accede a la cantidad de lecturas rojas.
    contarLecturasRoja(){
        return this.http.get<any>(`${API_URL}/api/lectura/lecturasRoja`, this.usuarioService.httpOptions);
    }
    //Método que accede a la cantidad ade lecturas en base al tipo de lectura y alerta.
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