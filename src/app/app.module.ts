import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserslistComponent } from './components/userslist/userslist.component';
import { FormComponent } from './components/form/form.component';
import { UserviewComponent } from './components/userview/userview.component';
import { HeaderComponent } from './components/header/header.component';
import { UsercardComponent } from './components/usercard/usercard.component';

@NgModule({
  declarations: [
    AppComponent,
    UserslistComponent,
    FormComponent,
    UserviewComponent,
    HeaderComponent,
    UsercardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
