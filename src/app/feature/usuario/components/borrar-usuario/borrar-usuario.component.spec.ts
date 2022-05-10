import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '@core/services/http.service';
import {  CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IAlertaService } from '@core/services/alertas/alerta.service';
import { AlertaServiceMock } from '@core/services/alertas/alerta.service-mock';
import { BorrarUsuarioComponent } from './borrar-usuario.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import { Router } from '@angular/router';

describe('BorrarUsuarioComponent', () => {

  let component: BorrarUsuarioComponent;
  let fixture: ComponentFixture<BorrarUsuarioComponent>;
  let usuarioService: UsuarioService;
  let alertaSpy: IAlertaService;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
    navigateByUrl: jasmine.createSpy('usuario'),
  }

  afterEach(() => { TestBed.resetTestingModule(); });
  afterAll(() => { TestBed.resetTestingModule(); });

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [ BorrarUsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'usuario', component: UsuarioComponent}]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [UsuarioService, HttpService,
        {provide: Router, useValue: mockRouter},
        {provide: IAlertaService, useValue: new AlertaServiceMock(alertaSpy)} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrarUsuarioComponent);
    component = fixture.componentInstance;
    component.usuario = new Usuario(1,'test usuario', '1234',null);
    usuarioService = TestBed.inject(UsuarioService);
    spyOn(usuarioService, 'eliminar').and.returnValue(
      of( true )
     );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

