import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/UsuarioService.service';
import { inject } from '@angular/core';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if(!usuarioService.estaLogueado()){
    router.navigate([""]);
  }
  return usuarioService.estaLogueado();
};
