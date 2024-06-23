import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentComponent } from './equipment.component';
import { ListEquipmentComponent } from './pages/list-equipment/list-equipment.component';
import { CreateEquipmentComponent } from './pages/create-equipment/create-equipment.component';
import { EditEquipmentComponent } from './pages/edit-equipment/edit-equipment.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListEquipmentComponent },
      { path: 'new', component: CreateEquipmentComponent },
      { path: 'edit/:id', component: EditEquipmentComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
