import { AdInterface } from "src/app/shared/types/ad.interface";

export interface AdStateInterface {
    isLoading: boolean;
    error: string | null;
    data: AdInterface | null;

}