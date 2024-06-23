import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlantaService } from '../services/PlantasService.service';
import { PaisService } from '../services/PaisesService.service';
import { Pais } from '../models/informacion/Pais';
import { Planta } from '../models/informacion/Planta';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';

@Component({
  selector: 'app-editar-planta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-planta.component.html',
  styleUrl: './editar-planta.component.scss'
})
export class EditarPlantaComponent implements OnInit{
  datos:any[] = [];
  paises:Pais[] = [];
  validos:boolean = false;
  @Input() idPlanta:number = -1;
  @Output() mostrar = new EventEmitter<boolean>();
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

  edicion = new FormGroup({
    nombre: new FormControl("",[Validators.required]),
    pais:new FormControl("",[Validators.required]),
    cantidadLecturas: new FormControl(0, [Validators.required]),
    cantidadOk: new FormControl(0, [Validators.required]),
    cantidadMedia: new FormControl(0, [Validators.required]),
    cantidadRoja: new FormControl(0, [Validators.required])
  })

  modificar(){
    const cantLecturas =this.edicion.get("cantidadLecturas")?.value||0;
    const cantOk =this.edicion.get("cantidadOk")?.value||0
    const cantMedia = this.edicion.get("cantidadMedia")?.value||0
    const cantRojas =this.edicion.get("cantidadRoja")?.value||0
    if(cantLecturas== cantOk+cantMedia+cantRojas){
    let planta:Planta;
    this.plantaService.buscarPorId(this.idPlanta).subscribe({
      next:(response)=>{
        console.log(response);
        let pais = this.paises.find(pais=> pais.getNombre == this.edicion.get("pais")?.value || "");
        planta = new Planta(response.plantas.id, response.plantas.nombre, response.plantas.pais, response.plantas.bandera);
        planta.setNombre(this.edicion.get("nombre")?.value||planta.getNombre);
        planta.setPais(this.edicion.get("pais")?.value||"");
        planta.setPais( pais?.getNombre||"");
        console.log()
        planta.setBandera(pais?.getBandera||"");
        this.plantaService.actualizarPlanta(planta).subscribe({
          next:()=>{
           
          }
        });
        

        this.plantaService.actualizarLecturas(this.idPlanta,this.edicion.get("cantidadLecturas")?.value||0,
        this.edicion.get("cantidadOk")?.value||0,
        this.edicion.get("cantidadMedia")?.value||0,
        this.edicion.get("cantidadRoja")?.value||0).subscribe({
          next:()=>{
            this.datosService.actualizarDatos();
          }
        })
        
        this.mostrar.emit(false);
      
      },
      error:(err)=>{
        console.log(err);
      }
    }
    );
  }else{
    this.validos = true;
  }
    
    
  }

  cancelarEdicion(event:any){
    this.mostrar.emit(false);
  }
}


