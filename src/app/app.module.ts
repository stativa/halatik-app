import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NavigationModule } from './navigation/navigation.module';
import { RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavigationModule,
    RouterModule.forRoot([
      {
        path: 'catalog/:category', component: ProductsComponent
      }
    ], { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
