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
//Servicio para acceder a la información de las plantas.
//Utiliza el UsuarioService para las credenciales y el token.
export class PlantaService{
 
    
    constructor(private usuarioService:UsuarioService, private http:HttpClient){}
    //Obtiene todas las plantas existentes.
    obtenerPlantas(){
         return this.http.get<any>(`${API_URL}/api/planta`, this.usuarioService.httpOptions);
    }
    //Crea una nueva planta en la base de datos.
    crearPlanta(planta:Planta){
        return this.http.post(`${API_URL}/api/planta`,planta,this.usuarioService.httpOptions);
    }
    //Actualiza las lecturas de manera aleatoria de una planta en base a las cantidades mandadas.
    actualizarLecturas(id:number, cantLectura:number, cantLecturaOk:number, cantLecturaMedia:number, cantLecturaRojo:number){

        const valores={
            idPlanta: id,
            canLecturas: cantLectura,
            cantLectOk: cantLecturaOk,
            cantLectMedio: cantLecturaMedia,
            cantLectRojo: cantLecturaRojo
        };
        return this.http.put(`${API_URL}/api/planta/update/lecturas`, valores,this.usuarioService.httpOptions);
    }
    //Actualiza el nombre y pais de una planta.
    actualizarPlanta(planta:Planta){
        return this.http.put(`${API_URL}/api/planta/update`, planta, this.usuarioService.httpOptions);
    }
    //Brinda la cantidad de lecturas ok de una planta pasada por id.
    cantidadOk(id:number){
        return this.http.get<any>(`${API_URL}/api/planta/contarOk/${id}`, this.usuarioService.httpOptions);
    }
    //Brinda la cantidad de lecturas media de una planta pasada por id.
    cantidadMedia(id:number){
        return this.http.get<any>(`${API_URL}/api/planta/contarMedia/${id}`, this.usuarioService.httpOptions);
    }
    //Brinda la cantidad de lecturas rojas de una planta pasada por id.
    cantidadRoja(id:number){
        return this.http.get<any>(`${API_URL}/api/planta/contarRoja/${id}`, this.usuarioService.httpOptions);
    }
    //Busca una planta especifica por id;
    buscarPorId(id:number){
        return this.http.get<any>(`${API_URL}/api/planta/encontrar/${id}`, this.usuarioService.httpOptions);
    }
    //Elimina una planta de la base de datos por id.
    eliminarPlanta(id:number){
        return this.http.delete(`${API_URL}/api/planta/eliminar/${id}`, this.usuarioService.httpOptions);
    }
    
}


