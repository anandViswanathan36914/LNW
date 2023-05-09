import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { ColDef, RowNode } from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import items from '../items/items.json'

interface Data {
  id: number;
  mobileNum: number;
  Date: string;
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  modal: HTMLElement;
  btn: HTMLElement;
  changeClass: boolean;
  toggleMenu: boolean;
  isUp: boolean;
  value: Data[] = items;
  myControl = new FormControl();
  firstNameOpt: Observable<string[]>;
  secondNameOpt: Observable<string[]>;
  firstNameArr = [];
  secondNameArr = [];
  inputDate = [];
  daysCount = [];
  currentDateTime: string;
  rowData = [];
  columnDefs: ColDef[] = [
    { field: 'ID' },
    { field: 'mobileNumber' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'Date' },
    { field: 'noOfDays' },
    { field: 'Confirmation' },
    { field: 'Comments' },
  ];

  defaultColDef: ColDef = {
    sortable: true, filter: true, resizable: true
  }
  subscription: Subscription;
  gridApiActive: any;
  searchName: any;




  constructor(private router: Router, private route: ActivatedRoute) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // this.router.navigate(['/b'], { relativeTo: this.route });
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  ngOnInit() {
    this.modal = document.getElementById("myModal");
    this.btn = document.getElementById("myBtn");
    this.numOfDays();
    this.buttonActive();
    this.accordianSearch();
    this.autoFilterOption();
    this.dataForRows();

    document.getElementById("ag-theme-alpine-dark").style.width = window.innerWidth + "px";

  }

  onGridReady(params) {
    this.gridApiActive = params.api;
    this.dataForRows();
  } 

  private dataForRows() {
    this.value.forEach((value, index) => {
      this.rowData.push(
        {
          ID: value.id, mobileNumber: value.mobileNum, firstName: value.firstName, lastName: value.lastName, Date: value.Date,
          noOfDays: this.daysCount[index], comments: ' '
        }
      );
    });
  }


  filterGrid() {
    this.gridApiActive.setQuickFilter(this.searchName);
  }

  numOfDays() {
    this.value.forEach((val) => {
      this.inputDate.push(new Date(val.Date));
    });
    const oneDay = 24 * 60 * 60 * 1000;
    let currentDate = new Date();
    this.inputDate.forEach((date) => {
      this.daysCount.push(Math.round(Math.abs((date - currentDate.getTime()) / oneDay)));
    });
  }

  autoFilterOption() {
    this.value.forEach((val) => {
      this.firstNameArr.push(val.firstName);
      this.secondNameArr.push(val.lastName);
    });
    this.firstNameOpt = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterFirstName(value))
      );
    this.secondNameOpt = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterSecondName(value))
      );
  }

  private filterSecondName(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.secondNameArr.filter(option => option.toLowerCase().includes(filterValue));
  }

  private filterFirstName(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.firstNameArr.filter(option => option.toLowerCase().includes(filterValue));
  }

  buttonActive() {
    let header = document.getElementById("myDIV");
    let btns = header.getElementsByClassName("btn");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  }

  accordianSearch() {
    let acc = document.getElementsByClassName("accordion");

    for (let i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }

  toggleSidePane() {
    this.toggleMenu = !this.toggleMenu;
    if (this.toggleMenu) {
      this.openNav();
    } else {
      this.closeNav();
    }

    if (this.isUp) {
      this.panelMaxHeight();
    }
  }

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("accordianMain").style.marginLeft = "250px";
    document.getElementById("gridMain").style.marginLeft = "250px";
    document.getElementById("ag-theme-alpine-dark").style.width = (window.innerWidth - 250) + "px";
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("accordianMain").style.marginLeft = "0";
    document.getElementById("gridMain").style.marginLeft = "0";
    document.getElementById("ag-theme-alpine-dark").style.width = window.innerWidth + "px";
  }

  panelMaxHeight() {
    document.getElementById("panel").style.maxHeight = "1000px";
  }

  arrowUp() {
    this.isUp = !this.isUp;
  }

  myBtn() {
    this.modal.style.display = "block";
  }

  close() {
    this.modal.style.display = "none";
  }

}
