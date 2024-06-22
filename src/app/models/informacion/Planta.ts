import { Lectura } from "./Lectura";

export class Planta{

    private id:number;
    private nombre:string;
    private pais:string;
    private bandera:string;
    private lecturas:Lectura[];

    constructor(id:number, nombre:string, pais:string, bandera:string){
        this.id = id;
        this.nombre = nombre;
        this.pais = pais;
        this.bandera = bandera;
        this.lecturas = [];
    }
 

    get getId(){
        return this.id;
    }

    get getNombre(){
        return this.nombre;
    }

    get getPais(){
        return this.pais;
    }

    get getBandera(){
        return this.bandera;
    }

    get getLecturas(){
        return this.lecturas;
    }

    setNombre(nombre:string){
        this.nombre = nombre;
    }

    setPais(pais:string){
        this.pais = pais;
    }

    setBandera(bandera:string){
        this.bandera = bandera;
    }

    setLectura(lectura:Lectura){
        this.lecturas.push(lectura);
    }
}