import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesViewerComponent } from './files-viewer.component';

describe('FilesViewerComponent', () => {
  let component: FilesViewerComponent;
  let fixture: ComponentFixture<FilesViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
