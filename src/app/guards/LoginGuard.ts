import { inject } from "@angular/core";
import { Router } from "express";



export const LoginGuard = ()=>{
    const router = inject(Router);
    
    if(localStorage.getItem("token") == "0" && localStorage.getItem("log") == "false"){
        router.navigate(["/main"])
        return false;
    }else{
        return true;
    }
}