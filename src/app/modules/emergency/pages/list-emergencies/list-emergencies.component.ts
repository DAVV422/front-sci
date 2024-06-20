import { Component } from '@angular/core';
import { EmergenciesTableComponent } from '../../components/emergencies-table/emergencies-table.component';
import { EmergencyTableItemComponent } from '../../components/emergency-table-item/emergency-table-item.component';
import { EmergenciesHeaderComponent } from '../../components/emergencies-header/emergencies-header.component';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    EmergenciesTableComponent,
    EmergencyTableItemComponent,
    EmergenciesHeaderComponent
  ],
  templateUrl: './list-emergencies.component.html',
  styleUrl: './list-emergencies.component.scss'
})
export class ListEmergenciesComponent {
  
}
