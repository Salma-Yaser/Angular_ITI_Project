import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Products } from './products/products';
import { NotFound } from './not-found/not-found';


export const routes: Routes = [
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    {path:'home' , component:Home},
    {path:'about' , component:About},
    {path:'contact' , component:Contact},
    {path:'product' , component:Products },
    {path:'**' , component:NotFound}
  
];
