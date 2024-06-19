import { Component } from '@angular/core';

@Component({
  selector: 'app-lecturas',
  standalone: true,
  imports: [],
  templateUrl: './lecturas.component.html',
  styleUrl: './lecturas.component.scss'
})
export class LecturasComponent {

  tilde:string = "../../assets/iconos/tildePequeña.png"
  exclamacion:string = "../../assets/iconos/exclamacionPequeña.png"
  alerta:string="../../assets/iconos/alertaPequeña.png"

}
