import { Component, OnInit } from '@angular/core';

import { Planta } from '../models/informacion/Planta';
import { PlantaService } from '../services/PlantasService.service';
import { CrearPlantaComponent } from '../crear-planta/crear-planta.component';
import { EditarPlantaComponent } from '../editar-planta/editar-planta.component';
import { DatosCompartidosService } from '../services/DatosCompartidosService.service';

/**
 * Componente destinado a mostrar la información de la tabla con las distintas plantas y sus carcateristicas correspondientes.
 * Hace uso de PlantaService y DatosService.
 */

@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [CrearPlantaComponent, EditarPlantaComponent],
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.scss'
})
export class PlantasComponent implements OnInit {
  datos: any[] = [];
  //Array destinada a almacenar las distintas plantas obtenidas de la api
  plantas: Planta[] = [];
  //Arreglos paralelos asociados a las distintas plantas para mostrar la cantidad de cada uno mediante el acceso a la api
  lecturasOk: number[] = []
  lecturasMedias: number[] = [];
  lecturasRojas: number[] = [];
  //Arreglo paralelos asociadoa  las plantas para poder mostrar el menú de edición o eliminación.
  opcionesVisible: boolean[] = [];
  //Boolean destinado a si mostrar o no la pestaña de creación de planta.
  crearHabilitado: boolean = false;
  //Boolean destinado a si mostrar o no la pestaña de edición de planta.
  modificarHabilitado: boolean = false;
  //Id de la planta que se enviará en caso de que se quiera modificar una planta.
  idPlanta: number = -1;

  constructor(private plantaService: PlantaService, private datosService: DatosCompartidosService) { }
  //Muestra y actualiza la información de la plantas existentes.
  ngOnInit(): void {
    this.datosService.obtenerActualizacionDatos$().subscribe(() => {
      this.actualizarInfo();
    })
  }
  //Método que hace que se muestre el menu de edición o eliminación de una planta especifica
  mostrarOpcion(index: number) {
    this.opcionesVisible[index] = !this.opcionesVisible[index];
  }

  //Método que muestra el la pestaña de crear nueva planta.
  mostrarCrear(mostrar: any) {
    this.crearHabilitado = mostrar;
  }
  //Método que muestra la pestaña de editar una planta específica.
  mostrarModificar(idPlanta: number, mostrar: any) {
    this.modificarHabilitado = mostrar;
    this.idPlanta = idPlanta;
  }
//Método para eliminar una planta de la base de datos.
  eliminarPlanta(idPlanta: number) {
    this.plantaService.eliminarPlanta(idPlanta).subscribe({
      next: () => {
        this.datosService.actualizarDatos();

      }
    });

  }
//Método que accede a la api de plantas y accede a sus datos para luego mostrarlos
  async actualizarInfo() {
    this.datos = [];
    this.plantas = [];
    this.lecturasOk = [];
    this.lecturasMedias = [];
    this.lecturasRojas = [];
    this.opcionesVisible = [];
    this.plantaService.obtenerPlantas().subscribe({
      next: (response) => {
        this.datos = response.plantas;
        this.datos.forEach((planta) => {
          this.plantas.push(new Planta(planta.id, planta.nombre, planta.pais, planta.bandera));
          this.plantas.sort((a, b) => a.getPais.localeCompare(b.getPais));

        });
        this.lecturasOk = new Array(this.plantas.length).fill(0);
        this.lecturasMedias = new Array(this.plantas.length).fill(0);
        this.lecturasRojas = new Array(this.plantas.length).fill(0);
        this.opcionesVisible = new Array(this.plantas.length).fill(false);

        this.plantas.forEach((planta, index) => {
          let lecturaOk: number;
          let lecturaMedia: number;
          let lecturaRoja: number;
          this.opcionesVisible.push(false);
          this.plantaService.cantidadOk(planta.getId).subscribe({
            next: (response) => {
              lecturaOk = response.cant;
              this.lecturasOk[index] = lecturaOk

            }
          })
          this.plantaService.cantidadMedia(planta.getId).subscribe({
            next: (response) => {
              lecturaMedia = response.cant;
              this.lecturasMedias[index] = lecturaMedia;
            }
          })

          this.plantaService.cantidadRoja(planta.getId).subscribe({
            next: (response) => {
              lecturaRoja = response.cant;
              this.lecturasRojas[index] = lecturaRoja;
            }
          })

        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}



