import { Injectable } from "@angular/core";
import { Usuario } from "../models/perfil/Usuario";
import { UsuarioService } from "./UsuarioService.service";
import { HttpClient } from "@angular/common/http";
import { Planta } from "../models/informacion/Planta";
import { Lectura } from "../models/informacion/Lectura";
import { TipoLectura } from "../models/informacion/TipoLectura";
import { Alerta } from "../models/informacion/Alerta";
import { API_URL } from "./constantes";



@Injectable({
    providedIn: 'root'
})

export class plantaService{
    datos:any[] = [];
    lecturas:any[] = [];
   plantas:Planta[] = [];
    
    constructor(private usuarioService:UsuarioService, private http:HttpClient){}
   
   

    obtenerPlantas(){
        this.http.get<any>(`${API_URL}/api/planta`, this.usuarioService.httpOptions).subscribe(
            {next:(responses)=>{
               this.datos = responses.plantas;
               this.datos.forEach(dato=>{
                let planta:Planta = new Planta(dato.id, dato.nombre, dato.pais, dato.bandera);
                this.lecturas = dato.lecturas;
                this.lecturas.forEach(lectura=>{
                    let tipoLectura:TipoLectura = new TipoLectura(lectura.tipo.id, lectura.tipo);
                    let alerta:Alerta = new Alerta(lectura.alerta.id, lectura.alerta.alerta);
                    let lectu = new Lectura(lectura.id,tipoLectura,alerta);
                    planta.setLectura(lectu);
                })
                    
                })
               },error(err){
                console.log(err);
        }})
    }

    actualizarLecturas(id:number, cantLectura:number, cantLecturaOk:number, cantLecturaMedia:number, cantLecturaRojo:number){

        const valores={
            idPlanta: id,
            canLecturas: cantLectura,
            cantLectOk: cantLecturaOk,
            cantLectMedio: cantLecturaMedia,
            cantLectRojo: cantLecturaRojo
        };
        this.http.post(`${API_URL}/api/planta/update/lecturas`, valores,this.usuarioService.httpOptions);
    }

    actualizarPlanta(planta:Planta){
        this.http.put(`${API_URL}/api/planta/update`, planta, this.usuarioService.httpOptions);
    }

    cantidadOk(id:number){
        return this.http.get(`${API_URL}/api/planta/contarOk/${id}`, this.usuarioService.httpOptions);
    }

    cantidadMedia(id:number){
        return this.http.get(`${API_URL}/api/planta/contarMedia/${id}`, this.usuarioService.httpOptions);
    }

    cantidadRoja(id:number){
        return this.http.get(`${API_URL}/api/planta/contarRoja/${id}`, this.usuarioService.httpOptions);
    }
}


