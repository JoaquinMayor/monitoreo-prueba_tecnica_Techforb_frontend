import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturasComponent } from './lecturas.component';

describe('LecturasComponent', () => {
  let component: LecturasComponent;
  let fixture: ComponentFixture<LecturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
