import { AuthStateInterface } from 'src/app/shared/types/authState.interface';
import { FeedStateInterface } from 'src/app/shared/modules/feed/types/feedState.interface';
import { TopTagsStateInterface } from 'src/app/shared/modules/topTags/types/topTagsState.interface';
import { AdStateInterface } from 'src/app/ad/types/adState.interface';
import { CreateAdStateInterface } from 'src/app/createAd/types/createAdState.interface';
import { EditAdStateInterface } from 'src/app/editAd/types/editAdState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  topTags: TopTagsStateInterface;
  ad: AdStateInterface;
  createAd: CreateAdStateInterface;
  editAd: EditAdStateInterface;
}
