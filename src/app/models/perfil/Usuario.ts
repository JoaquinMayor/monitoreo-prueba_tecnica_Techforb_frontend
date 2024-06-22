export class Usuario{
    private id:number;
    private nombre:string;
    private apellido:string;
    private email:string;
    private contrasenia:string;
    private enabled:boolean;

    constructor( nombre:string, apellido:string, email:string, contrasenia:string, enabled:boolean){
        this.id = 0;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.contrasenia = contrasenia;
        this.enabled = enabled;
    }
    
    get getId(){
        return this.id;
    }

    get getNombre(){
        return this.nombre;
    }

    get getApellido(){
        return this.apellido;
    }

    get getEmail(){
        return this.email
    }

    get getEnabled(){
        return this.enabled;
    }

    setNombre(nombre:string){
        this.nombre = nombre;
    }

    setApellido(apellido:string){
        this.apellido = apellido;
    }

    setEmail(email:string){
        this.email = email;
    }

    setContrasenia(contrasenia:string){
        this.contrasenia = contrasenia;
    }

    setEnabled(enabled:boolean){
        this.enabled = enabled;
    }
}