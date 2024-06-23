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
    console.log(index);
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
    this.plantaService.eliminarPlanta(idPlanta).subscribe({
      next:()=>{
        this.datosService.actualizarDatos();
    
      }
    });
    
  }

  async actualizarInfo(){
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
            this.plantas.sort((a, b) => a.getPais.localeCompare(b.getPais));
            
          });
          this.lecturasOk = new Array(this.plantas.length).fill(0);
        this.lecturasMedias = new Array(this.plantas.length).fill(0);
        this.lecturasRojas = new Array(this.plantas.length).fill(0);
        this.opcionesVisible = new Array(this.plantas.length).fill(false);
         
        this.plantas.forEach((planta, index)=>{
            let lecturaOk:number;
            let lecturaMedia:number;
            let lecturaRoja:number;
            this.opcionesVisible.push(false);
            this.plantaService.cantidadOk(planta.getId).subscribe({
              next:(response)=>{
                lecturaOk = response.cant;
                this.lecturasOk[index] = lecturaOk
                
              }
            })
             this.plantaService.cantidadMedia(planta.getId).subscribe({
              next:(response)=>{
                lecturaMedia = response.cant;
                this.lecturasMedias[index] = lecturaMedia;
              }
            })
        
             this.plantaService.cantidadRoja(planta.getId).subscribe({
              next:(response)=>{
                lecturaRoja = response.cant;
                this.lecturasRojas[index] = lecturaRoja;
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
  


