import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Router, RoutesRecognized } from '@angular/router';

import 'rxjs/add/operator/filter';


@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [NavigationService]
})
export class NavigationComponent implements OnInit {
  public items:any;
  constructor(private navigationService: NavigationService,
              private router: Router) {
    this.router.events
    .filter(event => event instanceof RoutesRecognized)
    .subscribe((event:RoutesRecognized) => {
      
     /* if (event.state.root.firstChild) {
        console.log(event.state.root.firstChild.params.translit);
        this.navigationService.getAll().then(this.onNavigationGetAll);
      } else {
        
      }*/
     /* if (event.url === '/') {
         
         return;
      }*/

      if(event.state.root.firstChild.url[1] && event.state.root.firstChild.url[1].path === 'type') {
        this.navigationService.getType(event.state.root.firstChild.params.subcategory).then(this.onNavigationGetAll);
        return;
      } else if(event.state.root.firstChild.params && event.state.root.firstChild.params.category) {
        this.navigationService.getCategory(event.state.root.firstChild.params.category).then(this.onNavigationGetAll);
        return;
      }
      
      this.navigationService.getAll().then(this.onNavigationGetAll);
    });
  }

  ngOnInit() {    
  }

  onNavigationGetAll = (res: any) => {
    this.items = res;
  }
}
