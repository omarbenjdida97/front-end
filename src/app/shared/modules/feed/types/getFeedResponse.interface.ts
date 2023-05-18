import { AdInterface } from "src/app/shared/types/ad.interface";

export interface GetFeedResponseInterface {
    ads: AdInterface[];
    adsCount: number;
}