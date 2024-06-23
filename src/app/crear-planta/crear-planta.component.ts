import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pais } from '../models/informacion/Pais';
import { PlantaService } from '../services/PlantasService.service';
import { PaisService } from '../services/PaisesService.service';
import { Planta } from '../models/informacion/Planta';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';

/**
 * Componente encargado de la creación de las nuevas plantas que se quieran agregar.
 * Solicita el ingreso en el formulario del nombre y una selección de los paises los cuales les brindaran su bandera.
 * Utiliza el PlantaService para almacenar los datos.
 * Utiliza PaisService para acceder a la api de paises y así tener toda la lista.
 * Utiliza DatoService, servicio utilizado para actualizar los componente cuando se modifica la información.
 */

@Component({
  selector: 'app-crear-planta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-planta.component.html',
  styleUrl: './crear-planta.component.scss'
})
export class CrearPlantaComponent implements OnInit{
  //Arreglo para acceder a la información del array de paises.
  datos:any[] = [];
  //Arreglo donde se almacenará la información relevante del api de paises.
  paises:Pais[] = [];
  //Output para transmitir la información de si se cancela la ventana de creación a la plantaComponent
  @Output() cancelar = new EventEmitter<boolean>();


  constructor(private plantaService:PlantaService, private paisService:PaisService, private datosService:DatosCompartidosService){}
 //Al Inicjiar se llama al ngOninit para cargar la lista de paises ordenados alfabéticamente.
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
  
  //Formulario reactivo que almacena el nombre de la planta y el nombre del país.
  creacion = new FormGroup({
    nombre: new FormControl("",[Validators.required]),
    pais:new FormControl("",[Validators.required])
  });
  //Función que cuando se le da al botón crear y si están todos los datos completados se crea una nueva planta y se guarda en la base de datos.
  crear(){
    
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
  //Función para poder cerrar la ventana de creación cuando se da al botón de cancelar. 
  cancelarCreacion(event:any){
    this.cancelar.emit(false);
  }
}
