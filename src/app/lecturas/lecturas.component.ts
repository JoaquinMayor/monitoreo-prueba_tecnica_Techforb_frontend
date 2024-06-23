import { Component, OnInit } from '@angular/core';
import { LecturaService } from '../services/LecturaService.service';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';
/**
 * Componente destinado a mostrar la información de los dintintos tipos de lecturas existentes.
 * Los ordena por tipo de lectura y luego tipo de alerta.
 * Utiliza los servicios de LecturaService y DatosService.
 */
@Component({
  selector: 'app-lecturas',
  standalone: true,
  imports: [],
  templateUrl: './lecturas.component.html',
  styleUrl: './lecturas.component.scss'
})
export class LecturasComponent implements OnInit{

  constructor(private lencuraService:LecturaService, private datosService:DatosCompartidosService){}
  //Variables para accerder a la dirección de los iconos
  tilde:string = "../../assets/iconos/tildePequeña.png"
  exclamacion:string = "../../assets/iconos/exclamacionPequeña.png"
  alerta:string="../../assets/iconos/alertaPequeña.png"
  //Array con los distintos tipos de alerta.
  tipoAlerta:string[] = ["OK", "MEDIAS","ROJAS"];
  //Array con los ditintos tipos de lecturas.
  tipoLectura:string[] = ["TEMPERATURA","PRESION","VIENTO","NIVELES","ENERGIA","TENSION","MONOXIDO_DE_CARBONO","OTROS_GASES"]
  
  //Arrays que almacenarán la cantidad de las dintintas lecturas en a su poición.
  lecturasOk:number[] = []
  lecturasMedia:number[] = []
  lecturasRoja:number[] = []
 
//Carga los datos de las distintas lecturas.
  ngOnInit(): void {
   this.actualizarInformacion()
    this.datosService.obtenerActualizacionDatos$().subscribe(()=>{
      this.actualizarInformacion();
    })
    
  }
//Consume la api de LecturaService para poder acceder a la información de las lecturas y luego mostrarlas
  actualizarInformacion(){
    this.lecturasOk= []
    this.lecturasMedia = []
    this.lecturasRoja = []
    for(let i:number = 0; i<8;i++){
      this.lecturasOk.push(0);
      this.lecturasMedia.push(0);
      this.lecturasRoja.push(0);
     

      
      this.lencuraService.cantidadPorAlerta(this.tipoLectura[i],this.tipoAlerta[0]).subscribe({
        next:(response)=>{
          console.log(response);
          console.log("hola");
          this.lecturasOk[i] = response.cant;
        },
        error:(err)=>{
          console.log(err);
        }
      })

      this.lencuraService.cantidadPorAlerta(this.tipoLectura[i],this.tipoAlerta[1]).subscribe({
        next:(response)=>{
          this.lecturasMedia[i] = response.cant;
        },
        error:(err)=>{
          console.log(err);
        }
      })

      this.lencuraService.cantidadPorAlerta(this.tipoLectura[i],this.tipoAlerta[2]).subscribe({
        next:(response)=>{
          this.lecturasRoja[i] = response.cant;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    console.log(this.lecturasOk);
    console.log(this.lecturasMedia);
    console.log(this.lecturasRoja);
    }
    
  }
}
