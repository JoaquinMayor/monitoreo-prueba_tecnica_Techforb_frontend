import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Servicio destinado a avisar a los disntos componente de actualizar su información en base a alguna acción de otro componente.
export class DatosCompartidosService {

  private actualizacionDatos = new BehaviorSubject<boolean>(false);
  //Método que avisa que se produjo un cambio.
  actualizarDatos(): void {
    this.actualizacionDatos.next(true);
  }
  //Método que actualiza los datos cuando se produce un cambio.
  obtenerActualizacionDatos$() {
    return this.actualizacionDatos.asObservable();
  }
}