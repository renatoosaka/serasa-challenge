import { PlantedCrop } from "../types/planted_crop";
import { api } from "./axios";

export async function getPlatedCrops(): Promise<Array<PlantedCrop>> {
  const { data: response } = await api.get("/planted-crops");

  const { data } = response;

  return data as Array<PlantedCrop>;
}
