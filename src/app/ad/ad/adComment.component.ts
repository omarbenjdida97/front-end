import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';


import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileInterface } from 'src/app/shared/types/profile.interface';
import { Comment } from 'src/app/shared/models/comment.model';
@Component({
  selector: 'egate-ad-comment',
  templateUrl: './adComment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdCommentComponent implements OnInit, OnDestroy {
  constructor(
    private userService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  private subscription: Subscription;

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  ngOnInit() {
    
    this.subscription = this.userService.getCurrentUser().subscribe(
      (userData: ProfileInterface) => {
     this.canModify = (userData.id === this.comment.author.id);
        this.cd.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }


}