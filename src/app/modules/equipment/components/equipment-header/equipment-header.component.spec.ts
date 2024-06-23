import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentHeaderComponent } from './equipment-header.component';

describe('EquipmentHeaderComponent', () => {
  let component: EquipmentHeaderComponent;
  let fixture: ComponentFixture<EquipmentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
