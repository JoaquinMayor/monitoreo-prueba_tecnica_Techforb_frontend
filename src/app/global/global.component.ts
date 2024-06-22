import { Component, OnInit } from '@angular/core';
import { LecturaService } from '../services/LecturaService.service';
import { SensorService } from '../services/SensoresService.service';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';

@Component({
  selector: 'app-global',
  standalone: true,
  imports: [],
  templateUrl: './global.component.html',
  styleUrl: './global.component.scss'
})
export class GlobalComponent implements OnInit{
  lecturasOk:number = 0;
  lecturasMedias:number = 0;
  lecturasRojas:number = 0;
  sensoresDesabilitados:number = 0;
  constructor(private lecturaService:LecturaService, private sensorService:SensorService, private datoService:DatosCompartidosService){

  }
  ngOnInit(): void {
    this.actualizarDatos;
    this.datoService.obtenerActualizacionDatos$().subscribe(()=>{
      this.actualizarDatos();
    })
  }

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
        this.sensorService = response.cant;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
