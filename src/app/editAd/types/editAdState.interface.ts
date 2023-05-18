import { AdInterface } from 'src/app/shared/types/ad.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export interface EditAdStateInterface {
  ad: AdInterface | null;
  isLoading: boolean;
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
