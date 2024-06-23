import { Component } from '@angular/core';
import { EquipmentHeaderComponent } from '../../components/equipment-header/equipment-header.component';
import { EquipmentTableComponent } from '../../components/equipment-table/equipment-table.component';
import { EquipmentTableItemComponent } from '../../components/equipment-table-item/equipment-table-item.component';

@Component({
  selector: 'app-list-equipment',
  standalone: true,
  imports: [
    EquipmentHeaderComponent,
    EquipmentTableComponent,
    EquipmentTableItemComponent
  ],
  templateUrl: './list-equipment.component.html',
  styleUrl: './list-equipment.component.scss'
})
export class ListEquipmentComponent {

}
