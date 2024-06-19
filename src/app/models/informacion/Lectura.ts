import { Alerta } from "./Alerta";
import { TipoLectura } from "./TipoLectura";


export class Lectura{

    private id:number;
    private tipo:TipoLectura;
    private alerta:Alerta;
    
    constructor(id:number, tipo:TipoLectura, alerta:Alerta){
        this.id = id;
        this.tipo = tipo;
        this.alerta = alerta;
    }

    get getId(){
        return this.id;
    }

    get getTipoLectura(){
        return this.tipo;
    }

    get getAlerta(){
        return this.alerta;
    }
}