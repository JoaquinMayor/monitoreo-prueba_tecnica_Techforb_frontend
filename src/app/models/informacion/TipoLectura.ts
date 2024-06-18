export class TipoLectura{

    private id:number;
    private tipo:string;

    constructor(id:number, tipo:string){
        this.id = id;
        this.tipo = tipo;
    }

    get getId(){
        return this.id;
    }

    get getTipo(){
        return this.tipo;
    }

}