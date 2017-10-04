import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ngx-unite-list',
  templateUrl: './unitelist.component.html',
  styleUrls: ['./unitelist.component.css']
})
export class UnitelistComponent implements OnInit {

  _totalPages;
  _filters : Array<any> = [];
  bsConfig: Partial<BsDatepickerConfig>;

  @Input() displayTable = true;
  @Input() tableData;
  @Input() tableHeaders;
  @Input() currentPage: number;
  @Input() searchBox = false;
  @Input() pagesToShow;
  @Input('table-class') tableBlockClass = 'table';
  @Input('filter-class') filterBlockClass = 'my-col col-xs-3';
  @Input() set data(value){
    this.tableData = value;
  };
  @Input() set totalPages(value){
    this._totalPages = Array(value).fill(1); // [0,1,2,3,4]
  };
  @Input() set filters(value){
    this._filters = value; // [0,1,2,3,4]
  };

  @Output() pageChanged = new EventEmitter();
  @Output() filterChanged = new EventEmitter();
  @Output() searchInput = new EventEmitter();

  @ViewChild('tableBody') checkingTableBody;

  myOptions: Array<any>;
  mySelectValue: Array<string>;

  constructor() {
  }

  ngOnInit() {
  }

  pageChange(newPage){
    var thisNewPage = newPage;

    if(typeof newPage === 'number')
    {
      // just because the pagination value starts from 0 and not 1 :D
      thisNewPage++;
    }

    if(thisNewPage != this.currentPage)
    {
      var obj = { currentPage : this.currentPage, newPage : thisNewPage };
      this.pageChanged.emit(obj);
    }
  }

  filterSelected(e, f){
    var obj = {status : 'selected', filterId : f, value : e.id, text : e.text};
    this.filterChanged.emit(obj);
  }

  filterRemoved(e,f){
    var obj = {status : 'removed', filterId : f, value : e.id, text : e.text};
    this.filterChanged.emit(obj);
  }

  dateChanged(e, f){
    if(e)
    {
      let obj = {status : 'selected', filterId : f, value : e};
      this.filterChanged.emit(obj);
    }
    else
    {
      let obj = {status : 'removed', filterId : f, value : ''};
      this.filterChanged.emit(obj);
    }
  }

  searchValueChanged(e){
    let obj = {keyPressed : e.key, searchVal : e.target.value, keyCode : e.which};
    this.searchInput.emit(obj);
  }
}