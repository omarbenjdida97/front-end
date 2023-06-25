import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from 'src/app/shared/models/comment.model';
import { map } from 'rxjs/operators';


@Injectable(
)
export class CommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(slug, payload): Observable<Comment> {
    return this.apiService
    .post(
      `/ads/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(map(data => data.comment));
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/ads/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId, articleSlug) {
    return this.apiService
           .delete(`/ads/${articleSlug}/comments/${commentId}`);
  }

}