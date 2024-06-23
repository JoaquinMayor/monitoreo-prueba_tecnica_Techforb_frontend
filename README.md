# MonitoreoPruebaTecnicaTechfordFrontend

## Prueba técnica de FrontEnd Angular de sistema de plantas y alertas.
### Solicitante TechFord.

Este proyecto fue generado con  [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Se corre con  `ng serve` para el server de desarrollo.Navegando a `http://localhost:4200/`. 

## Running unit tests

Se corre con `ng test`para ejecutarlo mediante [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Se corre con  `ng e2e`para correr el  end-to-end testsde la plataforma que uno elija. 

# Secciones
Esta aplicación cuenta con 3 secciones principales, el Login, Registro y el Dashboard.
Dentro de esta aplicación podremos crearnos un usuario, cuya contraseñia se encoentrará encriptada, para luego iniciar sensión y poder acceder  a la información de las plantas.
Toda la información se encuentra almacenada en una base de datos personal, generada con un back-end propio ([Link backend](https://github.com/JoaquinMayor/monitoreo-prueba-tecnica-techford)).
El manejo de los paises y sus banderas se maneja mediante una api externade [Restcountries](https://restcountries.com/v3.1/all)

## Carpetas
Dentro  dle proyecto podremos observar los distintos **componentes utilizados**, como así la carpeta **Model** con las clases creadas y la carpeta **Services**, donde encontraremos el consumo de las apis.