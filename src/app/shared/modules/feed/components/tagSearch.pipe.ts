import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagSearch',
  pure: true
})
export class TagSearchPipe implements PipeTransform {
  transform(ads: any[], searchText: string): any[] {
    if (!ads) {
      return [];
    }
    if (!searchText) {
      return ads;
    }

    searchText = searchText.toLowerCase();

    return ads.filter(ad => {
      return ad.tagList.some(tag => tag.toLowerCase().includes(searchText));
    });
  }
}
