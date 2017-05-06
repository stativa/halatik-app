import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ServerConnectionService } from '../services/server-connection.service'
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ProductsComponent
  ],
  exports: [
    ProductsComponent
  ],
  providers: [
    ServerConnectionService
  ]
})
export class ProductsModule { }
