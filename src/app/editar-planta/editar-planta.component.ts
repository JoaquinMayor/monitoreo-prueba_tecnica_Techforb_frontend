import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlantaService } from '../services/PlantasService.service';
import { PaisService } from '../services/PaisesService.service';
import { Pais } from '../models/informacion/Pais';

@Component({
  selector: 'app-editar-planta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-planta.component.html',
  styleUrl: './editar-planta.component.scss'
})
export class EditarPlantaComponent implements OnInit{

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

  edicion = new FormGroup({
    nombre: new FormControl("",[Validators.required]),
    pais:new FormControl("",[Validators.required]),
    cantidadLecturas: new FormControl("", [Validators.required]),
    cantidadOk: new FormControl("", [Validators.required]),
    cantidadMedia: new FormControl("", [Validators.required]),
    cantidadRoja: new FormControl("", [Validators.required])
  })

  modificar(){
    console.log(this.edicion.get("pais")?.value || "")
    let pais = this.paises.find(pais=> pais.getNombre == this.edicion.get("pais")?.value || "");
  }
}
