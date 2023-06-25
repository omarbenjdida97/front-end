import { ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription, combineLatest, map} from 'rxjs';
import { getAdAction } from 'src/app/ad/store/actions/getAd.action';
import { AdInterface } from 'src/app/shared/types/ad.interface';
import {
  adSelector,
  errorSelector,
  isLoadingSelector,
} from 'src/app/ad/store/selectors';
import { currentUserSelector, isAnonynmousSelector, isLoggedInSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { deleteAdAction } from 'src/app/ad/store/actions/deleteAd.action';
import { FormControl } from '@angular/forms';
import { CommentsService } from 'src/app/shared/services/comment.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { ChatSendComponent } from 'src/app/chatsend/chat.component';
import { AdService } from '../services/ad.service';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';

@Component({
  selector: 'egate-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css'],
})
export class AdComponent implements OnInit, OnDestroy {
  slug: string;
  
  ad: AdInterface;
  adSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;
  isSubmitting = false;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  currentUser:string;
  authorId: string;
  isLoggedIn$: Observable<boolean>;
  isAnonymous$: Observable<boolean>;
   @Output() applyClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor(private store: Store, private route: ActivatedRoute,  private commentsService: CommentsService,  private cd: ChangeDetectorRef, private chatSendComponent: ChatSendComponent, private router: Router, private adService: AdService) {}

  ngOnInit(): void {
    this.intitializeValues();
    this.initializeListeners();
    this.fetchData();
    this.populateComments();
    this.isLoggedIn$ = this.store.select(isLoggedInSelector);
    this.isAnonymous$ = this.store.select(isAnonynmousSelector);
   
  }
  getCurrentUrl(): string {
    return this.router.url;
  }
  ngOnDestroy(): void {
    this.adSubscription.unsubscribe();
  }
  populateComments() {
    
    this.commentsService.getAll(this.slug)
      .subscribe(comments => {
        this.comments = comments;
       
      });
  }
  applyToAd(slug: string): void {
    this.adService.applyToAd(slug).subscribe(
      (ad: AdInterface) => {
        console.log('Application successful!', {ad});
      },
      (error) => {
        console.error('Application failed:', error);
      }
    );
  }
  intitializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(adSelector)),
      this.store.pipe(select(currentUserSelector)),
    ).pipe(
      map(
        ([ad, currentUser]: [
          AdInterface | null,
          CurrentUserInterface | null,
        ]) => {
          if (!ad || !currentUser) {
            return false;
          }
          return currentUser.id === ad.author.id;
        },
      ),
    );
      }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};


    const commentBody = this.commentControl.value;
    this.commentsService
      .add(this.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
          this.isSubmitting = false;
          this.cd.markForCheck();
          console.log(comment);
        },
        errors => {
          
          this.isSubmitting = false;
          this.commentFormErrors = errors;
          this.cd.markForCheck();
        }
        
      );
  } 

  initializeListeners(): void {
    this.adSubscription = this.store
      .pipe(select(adSelector))
      .subscribe((ad: AdInterface | null) => {
        this.ad = ad;
        this.authorId = ad.author.username;
        console.log('author', this.authorId);
      });
  }
  fetchData(): void {
    this.store.dispatch(getAdAction({ slug: this.slug }));
  }
  deleteAd(): void {
    this.store.dispatch(deleteAdAction({ slug: this.slug }));
  }
  emitApplyClicked(): void {
    this.applyClicked.emit(this.authorId);
    console.log('author', this.authorId);
  }
  navigateToChat(): void {
    if (this.authorId) {
      console.log('author', this.authorId);
      this.router.navigate(['/chat'], { queryParams: { targetUserId: this.authorId } });
    }
  }
}
