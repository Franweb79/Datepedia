import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home-component/componente-home.component';
import { ErrorComponent } from './componentes/error-component/error-component.component';
import { ReadmeComponent } from './componentes/readme-component/readme/readme.component';

const routes: Routes = [

  { 
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  }, 
  { 
    
    path: 'home', component: HomeComponent,
   
  },
  {
    path:'readme',
    component:ReadmeComponent
  },
  { 
    
    path: '**', 
    component: ErrorComponent
    
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
