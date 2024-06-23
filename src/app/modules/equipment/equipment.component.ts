import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    standalone: true,
    imports: [RouterOutlet, AngularSvgIconModule],
})
export class EquipmentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
