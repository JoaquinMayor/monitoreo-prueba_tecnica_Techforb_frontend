import { Component, OnInit } from '@angular/core';

import { Planta } from '../models/informacion/Planta';
import { PlantaService } from '../services/PlantasService.service';
import { CrearPlantaComponent } from '../crear-planta/crear-planta.component';
import { EditarPlantaComponent } from '../editar-planta/editar-planta.component';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';

@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [CrearPlantaComponent, EditarPlantaComponent],
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.scss'
})
export class PlantasComponent implements OnInit{
  datos:any[] = [];
  plantas:Planta[] = [];
  lecturasOk:number[] = []
  lecturasMedias:number[] = [];
  lecturasRojas:number[] = [];
  opcionesVisible:boolean[] = [];
  crearHabilitado:boolean = false;
  modificarHabilitado:boolean = false;
  idPlanta:number = -1;

  constructor(private plantaService:PlantaService, private datosService:DatosCompartidosService){}
  
  ngOnInit(): void {
   
    this.datosService.obtenerActualizacionDatos$().subscribe(()=>{
      this.actualizarInfo();
    })
    
  
  }

  mostrarOpcion(index:number){
    this.opcionesVisible[index] = !this.opcionesVisible[index];

  }

  mostrarCrear(mostrar:any){
    this.crearHabilitado = mostrar;
  }

  mostrarModificar(idPlanta:number, mostrar:any){
    this.modificarHabilitado = mostrar;
    this.idPlanta =idPlanta;
  }

  eliminarPlanta(idPlanta:number){
    this.plantaService.eliminarPlanta(idPlanta);
    this.datosService.actualizarDatos();
    this.actualizarInfo();
  }

  actualizarInfo(){
    this.datos = [];
    this.plantas = [];
    this.lecturasOk= [];
    this.lecturasMedias = [];
    this.lecturasRojas = [];
    this.opcionesVisible = [];
    this.plantaService.obtenerPlantas().subscribe({
      next:(response)=>{
        this.datos = response.plantas;
          this.datos.forEach((planta)=>{
            this.plantas.push(new Planta(planta.id, planta.nombre, planta.pais, planta.bandera));
          });
          this.plantas.sort((a, b) => a.getPais.localeCompare(b.getPais));
          this.plantas.forEach(planta=>{
            let lecturaOk:number;
            let lecturaMedia:number;
            let lecturaRoja:number;
            this.opcionesVisible.push(false);
            this.plantaService.cantidadOk(planta.getId).subscribe({
              next:(response)=>{
                console.log(response);
                lecturaOk = response.cant;
                this.lecturasOk.push(lecturaOk);
                
              }
            })
            this.plantaService.cantidadMedia(planta.getId).subscribe({
              next:(response)=>{
                lecturaMedia = response.cant;
                this.lecturasMedias.push(lecturaMedia);
              }
            })
        
            this.plantaService.cantidadRoja(planta.getId).subscribe({
              next:(response)=>{
                lecturaRoja = response.cant;
                this.lecturasRojas.push(lecturaRoja);
              }
            })
           
           })
           
      },
      error:(err)=>{
          console.log(err);
      }
   })
    
  }
  
}
  


