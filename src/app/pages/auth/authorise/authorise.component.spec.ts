import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoriseComponent } from './authorise.component';

describe('AuthoriseComponent', () => {
  let component: AuthoriseComponent;
  let fixture: ComponentFixture<AuthoriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthoriseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthoriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
