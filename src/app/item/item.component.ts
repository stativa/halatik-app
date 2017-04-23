import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { ActivatedRoute } from '@angular/router';
import { SIZES } from '../../../constants'

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  providers: [ItemService]
})
export class ItemComponent implements OnInit {
  public item:any;
  public imgWidth = SIZES.ITEM_WIDTH;

  constructor(private _route: ActivatedRoute,
              private itemService: ItemService) { 

        this._route.params.subscribe((item) => {
            this.itemService.getItem(item.id).then(this.onGetItem);
        });
  }

  ngOnInit() {  
  }

  onGetItem = (res: any) => {
    this.item = res;
  }
}
