import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NavigationModule } from './navigation/navigation.module';
import { RouterModule } from '@angular/router';

import { UsefullListComponent } from './usefull/usefull-list.component';
import { UsefullInfoComponent } from './usefull/usefull-info.component';

import { ProductsComponent } from './products/products.component';
import { ItemComponent } from './item/item.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    UsefullListComponent,
    UsefullInfoComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NavigationModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'usefull_info', component: UsefullListComponent },
      { path: 'usefull_info/:name', component: UsefullInfoComponent },
      { path: 'catalog/type/:subcategory', component: ProductsComponent },
      { path: 'catalog/:category', component: ProductsComponent },
      { path: 'catalog/item/:id', component: ItemComponent }
      //
    ], { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
