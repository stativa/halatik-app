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
    router.events
    .filter(event => event instanceof RoutesRecognized)
    .subscribe((event:RoutesRecognized) => {
      
     /* if (event.state.root.firstChild) {
        console.log(event.state.root.firstChild.params.translit);
        this.navigationService.getAll().then(this.onNavigationGetAll);
      } else {
        
      }*/

      this.navigationService.getCategory(event.state.root.firstChild.params.category).then(this.onNavigationGetAll);
    });
  }

  ngOnInit() {    
  }

  onNavigationGetAll = (res: any) => {
    this.items = res;
  }
}
