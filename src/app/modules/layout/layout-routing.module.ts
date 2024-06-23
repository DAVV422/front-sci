import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { PublicGuard } from '../auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,    
    loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'users',
    component: LayoutComponent,    
    loadChildren: () => import('../user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'equipments',
    component: LayoutComponent,
    loadChildren: () => import('../equipment/equipment.module').then((m) => m.EquipmentModule),
  },
  {
    path: 'emergencies',
    component: LayoutComponent,    
    loadChildren: () => import('../emergency/emergency.module').then((m) => m.EmergencyModule),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
