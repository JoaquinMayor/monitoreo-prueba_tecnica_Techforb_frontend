export class Pais{

    private nombre:string;
    private bandera:string;

    constructor(nombre:string, bandera:string){
        this.nombre = nombre;
        this.bandera = bandera;
    }

    get getNombre(){
        return this.nombre;
    }

    get getBandera(){
        return this.bandera;
    }

    setNombre(nombre:string){
        this.nombre = nombre;
    }

    setBandera(bandera:string){
        this.bandera = bandera;
    }
}