import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToFavoritesAction } from '../store/actions/addToFavorites.action';

@Component({
  selector: 'egate-add-to-favorites',
  templateUrl: './addToFavorites.component.html',
  styleUrls: ['./addToFavorites.component.css'],
})
export class AddToFavoritesComponent implements OnInit {
  @Input('isFavorited') isFavoritedProps: boolean;
  @Input('favoritesCount') favoritesCountProps: number;
  @Input('adSlug') adSlugProps: string;

  favoritesCount: number;
  isFavorited: boolean;
  isButtonClicked = false;


  constructor(private store: Store) {}

  ngOnInit(): void {
    this.favoritesCount = this.favoritesCountProps;
    this.isFavorited = this.isFavoritedProps;
  }

  handleLike(): void {
    this.store.dispatch(
      addToFavoritesAction({
        isFavorited: this.isFavorited,
        slug: this.adSlugProps,
      }),
    );
    if (this.isFavorited) {
      this.favoritesCount = this.favoritesCount - 1;
    } else {
      this.favoritesCount = this.favoritesCount + 1;
    }
  }
}
