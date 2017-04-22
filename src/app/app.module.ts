import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NavigationModule } from './navigation/navigation.module';
import { RouterModule } from '@angular/router';

import { UsefullInfoComponent } from './usefull-info/usefull-info.component';
import { ProductsComponent } from './products/products.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    UsefullInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavigationModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'usefull_info', component: UsefullInfoComponent },
      { path: 'catalog/type/:subcategory', component: ProductsComponent },
      { path: 'catalog/:category', component: ProductsComponent }
      //
    ], { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
