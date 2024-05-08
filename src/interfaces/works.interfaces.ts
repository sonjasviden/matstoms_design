import { Timestamp } from "firebase/firestore";

export interface Work {
  _id: string;
  title: string;
  description: string;
  images: Image[];
  created: Timestamp;
  frontImage: Image;
}

export interface Image {
  _id?: number;
  src: string;
}
