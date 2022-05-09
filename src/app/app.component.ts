import { Component } from '@angular/core';
import { MenuItem } from '@core/modelo/menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-base';
  public companies: MenuItem[] = [
    { url: './home', nombre: 'Home' },
    { url: './usuario', nombre: 'Usuarios' },
    { url: './producto', nombre: 'Productos' },
    { url: './factura', nombre: 'Facturacion' },
    { url: './venta', nombre: 'Ventas' },
  ];

  

  
}
