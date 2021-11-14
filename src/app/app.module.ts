import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home-component/home.component';
import { HeaderComponent } from './componentes/header-menu-component/header-menu-component.component';
import { ErrorComponent } from './componentes/error-component/error-component.component';
import { ShowDaysComponent } from './componentes/show-days-component/show-days/show-days.component';
import { ModalComponent } from './componentes/modal-component/modal/modal.component';
import { ReadmeComponent } from './componentes/readme-component/readme/readme.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ErrorComponent,
    ShowDaysComponent,
    ModalComponent,
    ReadmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
