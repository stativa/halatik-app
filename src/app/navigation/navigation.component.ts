import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service' 

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [NavigationService]
})
export class NavigationComponent implements OnInit {
  public items:any;
  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.getAll().then(this.onNavigationGetAll);
  }

  onNavigationGetAll = (res: any) => {
    this.items = res;
  }
}
