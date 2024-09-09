import { PlantedCrop } from "./planted_crop";

export interface Producer {
  id: string;
  document: string;
  name: string;
  farm: string;
  city: string;
  state: string;
  area: number;
  farmable_area: number;
  vegetation_area: number;
  planted_crops: PlantedCrop[];
}

export interface ProducerFormData {
  document: string;
  name: string;
  farm: string;
  city: string;
  state: string;
  area: number;
  farmable_area: number;
  vegetation_area: number;
  planted_crops: Array<string>;
}

export interface UpdateProducerFormData extends ProducerFormData {
  id: string;
}
