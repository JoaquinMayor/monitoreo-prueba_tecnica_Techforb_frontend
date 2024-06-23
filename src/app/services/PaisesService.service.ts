import { Injectable } from "@angular/core";
import { Pais } from "../models/informacion/Pais";
import { HttpClient } from "@angular/common/http";
import { response } from "express";


@Injectable({
    providedIn: 'root'
})

export class PaisService{
    
    private url:string = "https://restcountries.com/v3.1/all";
   

    constructor(private httpclient:HttpClient){}
    
    listarPaises(){
        return this.httpclient.get<any[]>(this.url);
    }
}