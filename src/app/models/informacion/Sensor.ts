export class Sensor{

    private id:number;
    private habilitado:boolean;

    constructor(id:number, habilitado:boolean){
        this.id = id;
        this.habilitado = habilitado;
    }

    get getID(){
        return this.id;
    }

    get getHabilitado(){
        return this.habilitado;
    }

    setHabilitado(habilitado:boolean){
        this.habilitado = habilitado;
    }
}