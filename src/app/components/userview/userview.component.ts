import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  myUser:User={first_name:"",last_name:"",image:"",email:""};
  constructor(
    private usersService:UsersService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( async (params:any)=>{
      let id:number=parseInt(params.iduser);
      let response= await this.usersService.getById(id);
      if(response!==undefined){
        this.myUser=response;
      }
    })
  }
  alerta(){
    var opcion = confirm("Deseas Borrar al usuario " + this.myUser.first_name);
    if (opcion == true) {
      if(this.myUser.id!==undefined){
        this.usersService.delete(this.myUser.id).then(response => {
          if (response !== null) {
            alert('Usuario borrado correctamente');
          }
        })
        .catch(err => alert(err));
      }
	  }
    else {
	  }
  }

  borrar_usuario(){
    this.alerta();
  }
}