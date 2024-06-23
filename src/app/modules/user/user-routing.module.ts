import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { UserComponent } from './user.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ShowUserComponent } from './pages/show-user/show-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,    
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListUserComponent },
      { path: 'new', component: CreateUserComponent },
      { path: 'show/:id', component: ShowUserComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
