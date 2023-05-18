import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

export interface CreateAdStateInterface {
  isSubmitting: boolean;
  validationErrors: BackendErrorsInterface | null;
}
