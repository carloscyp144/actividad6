import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private arrUsers:User[]=[];
  baseURL:string="https://peticiones.online/api/users";
  constructor(private httpClient:HttpClient) {
    this.arrUsers=[];
  }
  getAll(pPage:number=1):Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(this.baseURL+'?page='+pPage))
  }
  getById(pId:number):Promise<any>{
    return lastValueFrom(this.httpClient.get<any>(`${this.baseURL}/${pId}`));
  }
  create(pUser:User):Promise<User>{
    return lastValueFrom(this.httpClient.post<User>(this.baseURL,pUser));
  }
  delete(pId:number):Promise<any>{
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseURL}/${pId}`));
  }
  update(pUser: User):Promise<any>{
    return lastValueFrom(this.httpClient.put<any>(`${this.baseURL}/${pUser.id}`,pUser));
  }
}