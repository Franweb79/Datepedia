import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home-component/home.component';
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

//useHash true prevents realoding from throwing 404 error
//https://medium.com/wineofbits/angular-2-routing-404-page-not-found-on-refresh-a9a0f5786268
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
