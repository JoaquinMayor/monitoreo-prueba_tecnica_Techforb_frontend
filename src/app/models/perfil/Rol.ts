export class Rol{
    
    private id:number;
    private nombre: string;

    constructor(id:number, nombre:string){
        this.id = id;
        this.nombre = nombre;
    }

    get getNombre(){
        return this.nombre;
    }

    get getId(){
        return this.id;
    }
}