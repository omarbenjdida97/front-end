import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { currentUserSelector} from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'egate-sidebar',
  templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent implements OnInit{
 
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store) {
   
  }

  ngOnInit(): void {
   
    this.currentUser$ = this.store.select(currentUserSelector);
    
  }
  
}
