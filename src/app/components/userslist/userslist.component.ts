import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {

  arrUsers:User[]=[];
  users_por_pagina=8;
  currentPage:number=1;
  total_pages:number=1;
  per_page:number=1;
  constructor(private usersServices: UsersService) { }

  async ngOnInit(): Promise<void> {
    try{
      let response= await this.usersServices.getAll();
      this.total_pages = response.total_pages;
      this.per_page = response.per_page;
      if(response.total<this.users_por_pagina){
        this.users_por_pagina=this.per_page;
      }
      this.datos(1);
    }catch(err){
      alert(err);
    }
  }
  async datos(pPage:number):Promise<void>{
    this.currentPage=pPage;
    let minimo_elemento_pagina=Math.floor((this.users_por_pagina*(this.currentPage-1))/this.per_page)+1;
    let minimo_elemento_elemento=this.users_por_pagina*(this.currentPage-1)%this.per_page;
    let response= await this.usersServices.getAll(minimo_elemento_pagina);
    this.arrUsers=[];
    for(let i=0; i<this.users_por_pagina; i++){
      delete response.data[minimo_elemento_elemento].password;
      delete response.data[minimo_elemento_elemento].username;
      this.arrUsers.push(response.data[minimo_elemento_elemento]);
      minimo_elemento_elemento++;
      if(minimo_elemento_elemento==this.per_page){
        minimo_elemento_elemento=0;
      }
      if(minimo_elemento_elemento==0){
        minimo_elemento_pagina++;
        response= await this.usersServices.getAll(minimo_elemento_pagina);
      }
      if(response.data[minimo_elemento_elemento]===undefined){
        i=this.users_por_pagina;
      }
    }
  }
  gotoPage(pPage:number):void{
      this.datos(pPage);
  }
}