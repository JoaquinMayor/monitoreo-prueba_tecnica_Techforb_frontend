export class Alerta{


    private id:number;
    private alerta:string;

    constructor(id:number, alerta:string){
        this.id = id;
        this.alerta = alerta;
    }

    get getId(){
        return this.id;
    }

    get getAlerta(){
        return this.alerta;
    }
}