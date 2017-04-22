import { Component, OnInit } from '@angular/core';
import { UsefullInfoService } from '../services/usefull-info.service';
import { ActivatedRoute } from '@angular/router';
import { SIZES } from '../../../constants'

@Component({ 
  selector: 'usefull-info',
  templateUrl: './usefull-info.component.html',
  styleUrls: ['./usefull-info.component.css'],
  providers: [UsefullInfoService]
})
export class UsefullInfoComponent implements OnInit {
  public items:any;
  public previewImgWidth = SIZES.USEFULL_PREVIEW_IMG_WIDTH;

  constructor(private _route: ActivatedRoute,
              private usefullInfoService: UsefullInfoService) { 
    this._route.params.subscribe((item) => {
      if (!item.id) {
        this.usefullInfoService.getAll().then(this.onItemGetAll);
      } else {
        this.usefullInfoService.getUsefullInfo(item.id).then(this.onItemGetAll);
      }
    });
  }

  ngOnInit() {  
  }

  onItemGetAll = (res: any) => {
    this.items = res;
  }
}