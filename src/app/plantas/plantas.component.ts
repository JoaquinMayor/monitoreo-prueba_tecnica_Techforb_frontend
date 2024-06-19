import { Component, OnInit } from '@angular/core';

import { Planta } from '../models/informacion/Planta';
import { PlantaService } from '../services/PlantasService.service';

@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [],
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.scss'
})
export class PlantasComponent implements OnInit{
  plantas:Planta[] = [];
  lecturasMedias:number[] = [];
  lecturasRojas:number[] = [];
  
  constructor(private plantaService:PlantaService){}
  
  ngOnInit(): void {
   this.plantas = this.plantaService.obtenerPlantas();
   this.plantas.forEach(planta=>{
    let lecturaMedia:number;
    let lecturaRoja:number;
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
  }
  
}
  


