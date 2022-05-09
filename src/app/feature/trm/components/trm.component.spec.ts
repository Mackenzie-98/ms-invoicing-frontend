import { fakeAsync, waitForAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { TrmComponent } from './trm.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from 'src/app/core/services/http.service';
import { TrmService } from '../service/trm.service';
import { DatePipe } from '@angular/common';

describe('TrmComponent', () => {
  let component: TrmComponent;
  let fixture: ComponentFixture<TrmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TrmComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [TrmService, HttpService, DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.spinner).toBeTrue();
  });

  it('Deberia el estado del spinner ser falso', () => {
    component.spinner = false;
    expect(component.spinner).toBeFalse();
  });

  it('spinner debería desaparecer despues de 500ms', fakeAsync(() => {
    expect(component.spinner).toBeTrue();
    tick(500);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.spinner).toBeFalse();
    });
   }));
});
