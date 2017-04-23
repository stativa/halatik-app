import { Component, OnInit } from '@angular/core';
import { UsefullService } from '../services/usefull.service';
import { ActivatedRoute } from '@angular/router';
import { SIZES } from '../../../constants'

@Component({ 
  selector: 'usefull-info',
  templateUrl: './usefull-info.component.html',
  styleUrls: ['./usefull.component.css'],
  providers: [UsefullService]
})
export class UsefullInfoComponent implements OnInit {
  public item:any;
  public imgWidth = SIZES.USEFULL_IMG_WIDTH;

  constructor(private _route: ActivatedRoute,
              private usefullService: UsefullService) { 
    this._route.params.subscribe((item) => {
      if (item.name) {
        this.usefullService.getUsefullInfo(item.name).then(this.onItemGetUsefullInfo);
      }
    });
  }

  ngOnInit() {  
  }

  onItemGetUsefullInfo = (res: any) => {
    this.item = res;
    console.log(this.item)
  }
}