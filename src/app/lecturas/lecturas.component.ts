import { Component, OnInit } from '@angular/core';
import { LecturaService } from '../services/LecturaService.service';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';

@Component({
  selector: 'app-lecturas',
  standalone: true,
  imports: [],
  templateUrl: './lecturas.component.html',
  styleUrl: './lecturas.component.scss'
})
export class LecturasComponent implements OnInit{

  constructor(private lencuraService:LecturaService, private datosService:DatosCompartidosService){}
  tilde:string = "../../assets/iconos/tildePequeña.png"
  exclamacion:string = "../../assets/iconos/exclamacionPequeña.png"
  alerta:string="../../assets/iconos/alertaPequeña.png"
  tipoAlerta:string[] = ["OK", "MEDIAS","ROJAS"];
  tipoLectura:string[] = ["TEMPERATURA","PRESION","VIENTO","NIVELES","ENERGIA","TENSION","MONOXIDO_DE_CARBONO","OTROS_GASES"]

  lecturasOk:number[] = []
  lecturasMedia:number[] = []
  lecturasRoja:number[] = []
 

  ngOnInit(): void {
   this.actualizarInformacion()
    this.datosService.obtenerActualizacionDatos$().subscribe(()=>{
      this.actualizarInformacion();
    })
    
  }

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
