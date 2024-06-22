import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosCompartidosService {

  private actualizacionDatos = new BehaviorSubject<boolean>(false);

  actualizarDatos(): void {
    this.actualizacionDatos.next(true);
  }

  obtenerActualizacionDatos$() {
    return this.actualizacionDatos.asObservable();
  }
}