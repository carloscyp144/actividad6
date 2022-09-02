import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css']
})
export class UsercardComponent implements OnInit {

  @Input() myUser!:User;
  constructor(private userServices:UsersService) { }

  ngOnInit(): void {
  }
  alerta(){
    var opcion = confirm("Deseas Borrar al usuario " + this.myUser.first_name);
    if (opcion == true) {
      if(this.myUser.id!==undefined){
        this.userServices.delete(this.myUser.id).then(response => {
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