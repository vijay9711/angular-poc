import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserSectionComponent } from './pages/user-section/user-section.component';
import { AboutComponent } from './pages/about/about.component';
const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { 
    path:'layout', 
    component: LayoutComponent, 
    children:[
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'userSection',
        component: UserSectionComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
