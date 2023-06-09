import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserAction } from 'src/app/auth/store/actions/getCurrentUser.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 


  constructor(private store: Store) {}
  ngOnInit(): void {
      this.store.dispatch(getCurrentUserAction())
     
  }
 
}
