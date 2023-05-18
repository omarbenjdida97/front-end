import { Component, Input } from "@angular/core";
import { PopularTagType } from "src/app/shared/types/popularTag.type";

@Component({
    selector:'egate-tag-list',
    templateUrl:'./tagList.component.html',
    styleUrls:['./tagList.component.css']
})

export class TagListComponent{
    @Input('tags') tagsProps: PopularTagType[];

}