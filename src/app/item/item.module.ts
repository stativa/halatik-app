import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { ServerConnectionService } from '../services/server-connection.service'
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    ItemComponent
  ],
  exports: [
    ItemComponent
  ],
  providers: [
    ServerConnectionService
  ]
})
export class ItemModule { }
