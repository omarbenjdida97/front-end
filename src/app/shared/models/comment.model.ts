import { ProfileInterface } from '../types/profile.interface';


export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  author: ProfileInterface;
}