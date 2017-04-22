import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsefullInfoComponent } from './usefull-info.component';
import { ServerConnectionService } from '../services/server-connection.service'
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    UsefullInfoComponent
  ],
  exports: [
    UsefullInfoComponent
  ],
  providers: [
    ServerConnectionService
  ]
})
export class ProductsModule { }
