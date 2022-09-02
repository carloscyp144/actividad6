import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  userForm:FormGroup;
  cabecera:string="NUEVO USUARIO";
  boton_envio:string="Guardar";
  usuario_antiguo!:User;
  constructor(
    private activatedRoute:ActivatedRoute,
    private userServices:UsersService,
    private router:Router
    ) {
    this.userForm=new FormGroup({
      first_name:new FormControl('',[Validators.required]),
      last_name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/)]),
      image:new FormControl('',[Validators.required]),
    })
  }
  async getDataForm():Promise<void>{
    let newUser=this.userForm.value;
    if(newUser.id && !this.son_iguales(newUser,this.usuario_antiguo)){
      let response=await this.userServices.update(newUser);
      if(response.id){
        alert('Usuario modificado');
        this.router.navigate(['/home']);
      }
      else{
        alert('Hubo un error intentelo de nuevo');
      }
    }
    else if(newUser.id){}
    else{
      let response=await this.userServices.create(newUser);
      if(response.id){
        alert('Usuario creado');
        this.router.navigate(['/home']);
      }
      else{
        alert('Hubo un error intentelo de nuevo');
      }
    }
  }
  son_iguales(viejo:any,nuevo:any):boolean{
    return ((viejo.first_name==nuevo.first_name) && (viejo.last_name==nuevo.last_name) 
    && (viejo.email==nuevo.email) && (viejo.image==nuevo.image));
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( async (params:any)=>{
      let id:number=parseInt(params.iduser);
      if(!isNaN(parseInt(params.iduser))){
        this.cabecera="ACTUALIZAR USUARIO";
        this.boton_envio="Actualizar";
        let response= await this.userServices.getById(id);
        if(response!==undefined){
          this.usuario_antiguo=response;
          this.userForm=new FormGroup({
            first_name:new FormControl(response.first_name,[Validators.required]),
            last_name:new FormControl(response.last_name,[Validators.required]),
            email:new FormControl(response.email,[Validators.required,Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/)]),
            image:new FormControl(response.image,[Validators.required]),
            id:new FormControl(response.id,[]),
          })
        }
      }
    })
  }
}