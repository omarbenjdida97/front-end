import { PopularTagType } from "./popularTag.type";
import { ProfileInterface } from "./profile.interface";

export interface AdInterface {
  slug: string;
  subject: string;
  title: string;
  type: string[];
  hourlyRate: number;
  description: string;
  location: string;
  requiredSkills: string[];
  aboutAuthor: string;
  createdAt: string;
  updatedAt: string;
  tagList: PopularTagType[];
  reccCount: number;
  studentNumber: number;
  longitude: number;
  latitude: number;
  favorited: boolean;
  author : ProfileInterface;
  acceptedApplicants : ProfileInterface[];
}
