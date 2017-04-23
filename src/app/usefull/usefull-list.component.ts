import { Component, OnInit } from '@angular/core';
import { UsefullService } from '../services/usefull.service';
import { ActivatedRoute } from '@angular/router';
import { SIZES } from '../../../constants'

@Component({ 
  selector: 'usefull-list',
  templateUrl: './usefull-list.component.html',
  styleUrls: ['./usefull.component.css'],
  providers: [UsefullService]
})
export class UsefullListComponent implements OnInit {
  public items:any;
  public previewImgWidth = SIZES.USEFULL_PREVIEW_IMG_WIDTH;

  constructor(private _route: ActivatedRoute,
              private usefullService: UsefullService) { 
    this._route.params.subscribe((item) => {
      if (!item.id) {
        this.usefullService.getAll().then(this.onItemGetAll);
      } else {
        this.usefullService.getUsefullInfo(item.id).then(this.onItemGetAll);
      }
    });
  }

  ngOnInit() {  
  }

  onItemGetAll = (res: any) => {
    this.items = res;
  }
}