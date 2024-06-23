import { Injectable } from "@angular/core";
import { Pais } from "../models/informacion/Pais";
import { HttpClient } from "@angular/common/http";
import { response } from "express";


@Injectable({
    providedIn: 'root'
})
//Servicio que accede a la a la información de la api de paises.
export class PaisService{
    //URL de la api de paises.
    private url:string = "https://restcountries.com/v3.1/all";
   

    constructor(private httpclient:HttpClient){}
    //Accede a la información de todos los paises.
    listarPaises(){
        return this.httpclient.get<any[]>(this.url);
    }
}