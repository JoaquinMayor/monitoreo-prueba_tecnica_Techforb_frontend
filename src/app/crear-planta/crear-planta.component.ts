import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pais } from '../models/informacion/Pais';
import { PlantaService } from '../services/PlantasService.service';
import { PaisService } from '../services/PaisesService.service';
import { Planta } from '../models/informacion/Planta';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';



@Component({
  selector: 'app-crear-planta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-planta.component.html',
  styleUrl: './crear-planta.component.scss'
})
export class CrearPlantaComponent implements OnInit{
  datos:any[] = [];
  paises:Pais[] = [];
  @Output() cancelar = new EventEmitter<boolean>();


  constructor(private plantaService:PlantaService, private paisService:PaisService, private datosService:DatosCompartidosService){}
  ngOnInit(): void {
    this.paisService.listarPaises().subscribe({
      next:(response)=>{
          this.datos = response;
          this.datos.forEach(dato=>{
              this.paises.push(new Pais(dato.name.official, dato.flags.png));
             
          this.paises.sort((a, b) => {
                if (a.getNombre < b.getNombre) {
              return -1;
            }
              if (a.getNombre > b.getNombre) {
            return 1;
        }
              return 0;
            });
          })
          
      }, error:(err)=>{
          console.log(err);
      }
  }
);
  }
  
  
  creacion = new FormGroup({
    nombre: new FormControl("",[Validators.required]),
    pais:new FormControl("",[Validators.required])
  });

  crear(){
    console.log(this.creacion.get("pais")?.value || "")
    let pais = this.paises.find(pais=> pais.getNombre == this.creacion.get("pais")?.value || "");
    let plata:Planta = new Planta(0, this.creacion.get("nombre")?.value || "", pais?.getNombre||"", pais?.getBandera||"");
    this.plantaService.crearPlanta(plata).subscribe({
      next:()=>{
        const info = false;
        this.datosService.actualizarDatos();
        this.cancelar.emit(info);
      }
    });
    
  }

  cancelarCreacion(event:any){
    this.cancelar.emit(false);
  }
}
