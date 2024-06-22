import { Injectable } from "@angular/core";
import { Usuario } from "../models/perfil/Usuario";
import { UsuarioService } from "./UsuarioService.service";
import { HttpClient } from "@angular/common/http";
import { Planta } from "../models/informacion/Planta";
import { Lectura } from "../models/informacion/Lectura";
import { TipoLectura } from "../models/informacion/TipoLectura";
import { Alerta } from "../models/informacion/Alerta";
import { API_URL } from "./constantes";
import { map } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class PlantaService{
    datos:any[] = [];
    lecturas:any[] = [];
   plantas:Planta[] = [];
    
    constructor(private usuarioService:UsuarioService, private http:HttpClient){}

    obtenerPlantas(){
         return this.http.get<any>(`${API_URL}/api/planta`, this.usuarioService.httpOptions);
    }

    crearPlanta(planta:Planta){
        this.http.post(`${API_URL}/api/planta`,planta,this.usuarioService.httpOptions).subscribe();
    }

    actualizarLecturas(id:number, cantLectura:number, cantLecturaOk:number, cantLecturaMedia:number, cantLecturaRojo:number){

        const valores={
            idPlanta: id,
            canLecturas: cantLectura,
            cantLectOk: cantLecturaOk,
            cantLectMedio: cantLecturaMedia,
            cantLectRojo: cantLecturaRojo
        };
        this.http.put(`${API_URL}/api/planta/update/lecturas`, valores,this.usuarioService.httpOptions).subscribe();
    }

    actualizarPlanta(planta:Planta){
        this.http.put(`${API_URL}/api/planta/update`, planta, this.usuarioService.httpOptions).subscribe();
    }

    cantidadOk(id:number){
        return this.http.get<any>(`${API_URL}/api/planta/contarOk/${id}`, this.usuarioService.httpOptions);
    }

    cantidadMedia(id:number){
        return this.http.get<any>(`${API_URL}/api/planta/contarMedia/${id}`, this.usuarioService.httpOptions);
    }

    cantidadRoja(id:number){
        return this.http.get<any>(`${API_URL}/api/planta/contarRoja/${id}`, this.usuarioService.httpOptions);
    }

    buscarPorId(id:number){
        return this.http.get<any>(`${API_URL}/api/planta/encontrar/${id}`, this.usuarioService.httpOptions);
    }
    
    eliminarPlanta(id:number){
        return this.http.delete(`${API_URL}/api/planta/eliminar/${id}`, this.usuarioService.httpOptions).subscribe();
    }
    
}


