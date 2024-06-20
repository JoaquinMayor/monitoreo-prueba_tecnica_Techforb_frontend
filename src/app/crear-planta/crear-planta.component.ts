import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pais } from '../models/informacion/Pais';
import { PlantaService } from '../services/PlantasService.service';
import { PaisService } from '../services/PaisesService.service';
import { Planta } from '../models/informacion/Planta';

@Component({
  selector: 'app-crear-planta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-planta.component.html',
  styleUrl: './crear-planta.component.scss'
})
export class CrearPlantaComponent implements OnInit{
  
  paises:Pais[] = [];

  constructor(private plantaService:PlantaService, private paisService:PaisService){}
  ngOnInit(): void {
    this.paisService.listarPaises();
    this.paises = this.paisService.paises;
    this.paises.sort((a, b) => {
      if (a.getNombre < b.getNombre) {
          return -1;
      }
      if (a.getNombre > b.getNombre) {
          return 1;
      }
      return 0;
  });
  }
  
  
  creacion = new FormGroup({
    nombre: new FormControl("",[Validators.required]),
    pais:new FormControl("",[Validators.required])
  });

  crear(){
    console.log(this.creacion.get("pais")?.value || "")
    let pais = this.paises.find(pais=> pais.getNombre == this.creacion.get("pais")?.value || "");
    let plata:Planta = new Planta(0, this.creacion.get("nombre")?.value || "", pais?.getNombre||"", pais?.getBandera||"");
    this.plantaService.crearPlanta(plata);
  }
}