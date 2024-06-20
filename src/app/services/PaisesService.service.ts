import { Injectable } from "@angular/core";
import { Pais } from "../models/informacion/Pais";
import { HttpClient } from "@angular/common/http";
import { response } from "express";


@Injectable({
    providedIn: 'root'
})

export class PaisService{
    
    private url:string = "https://restcountries.com/v3.1/all";
    paises:Pais[] =[];
    datos:any[] = [];
   

    constructor(private httpclient:HttpClient){}
    
    listarPaises(){
        this.httpclient.get<any[]>(this.url).subscribe({
            next:(response)=>{
                this.datos = response;
                this.datos.forEach(dato=>{
                    this.paises.push(new Pais(dato.name.official, dato.flags.png));
                })
                
            }, error:(err)=>{
                console.log(err);
            }
        }
   )
    }
}