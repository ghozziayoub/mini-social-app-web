import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentRowComponent } from './comment-row.component';

describe('CommentRowComponent', () => {
  let component: CommentRowComponent;
  let fixture: ComponentFixture<CommentRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
