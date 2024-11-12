// "popupId": number;
// "visitDate": string;
// "satisfaction": string;
// "congestion": string;
// "text": string;
// "images": ImageType[];
import {ImageTypeSchema} from '../imageType.schema';

export type PopupReviewCreateSchema = {
  popupId: number;
  visitDate: string;
  satisfaction: string;
  congestion: string;
  text: string;
  images: ImageTypeSchema[];
};
