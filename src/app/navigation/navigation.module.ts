import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { ServerConnectionService } from '../services/server-connection.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent
  ],
  providers: [
    ServerConnectionService
  ]
})
export class NavigationModule { }
