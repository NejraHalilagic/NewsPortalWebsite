import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBackIssuesComponent } from './purchase-back-issues.component';

describe('PurchaseBackIssuesComponent', () => {
  let component: PurchaseBackIssuesComponent;
  let fixture: ComponentFixture<PurchaseBackIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseBackIssuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseBackIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
