import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryOutputComponent } from './primary-output.component';

describe('PrimaryOutputComponent', () => {
  let component: PrimaryOutputComponent;
  let fixture: ComponentFixture<PrimaryOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryOutputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimaryOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
