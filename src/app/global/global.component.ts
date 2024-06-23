import { Component, OnInit } from '@angular/core';
import { LecturaService } from '../services/LecturaService.service';
import { SensorService } from '../services/SensoresService.service';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';

/**
 * Método destinado a mostrar la información de cantidad de lecturas entre todas la plantas
 * y mostrar la cantidad de sensores desabilitados.
 * Utiliza los servicios de LecturaService, SensorService y DatosService.
 */
@Component({
  selector: 'app-global',
  standalone: true,
  imports: [],
  templateUrl: './global.component.html',
  styleUrl: './global.component.scss'
})
export class GlobalComponent implements OnInit{
  //Variable que mostrará la cantidad de lecturas Ok
  lecturasOk:number = 0;
  //Variable que mostrará la cantidad de lecturas Medias
  lecturasMedias:number = 0;
  //Variable que mostrará la cantidad de lecturas Rojas
  lecturasRojas:number = 0;
  //Variable que mostrará la cantidad de sensores desabilitados
  sensoresDesabilitados:number = 0;
  constructor(private lecturaService:LecturaService, private sensorService:SensorService, private datoService:DatosCompartidosService){

  }
  //Método NgOnInit que cargará los datos globales de todas las plantas
  ngOnInit(): void {
    this.actualizarDatos;
    this.datoService.obtenerActualizacionDatos$().subscribe(()=>{
      this.actualizarDatos();
    })
  }
//Método destinado al consumo de la api de lecturas y sensores para acceder y actualizar la información.
  actualizarDatos(){
    this.lecturasOk = 0;
    this.lecturasMedias = 0;
    this.lecturasRojas = 0;
    this.sensoresDesabilitados = 0;
    this.lecturaService.contarLecturasOk().subscribe({
      next:(response)=>{
        this.lecturasOk = response.cant;
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.lecturaService.contarLecturasMedia().subscribe({
      next:(response)=>{
        this.lecturasMedias = response.cant;
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.lecturaService.contarLecturasRoja().subscribe({
      next:(response)=>{
        this.lecturasRojas = response.cant;
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.sensorService.contarSensores().subscribe({
      next:(response) =>{
        this.sensoresDesabilitados = response.cant;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
