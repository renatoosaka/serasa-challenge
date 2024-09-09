import {
  ProducerFormData,
  UpdateProducerFormData,
  Producer,
} from "../types/producer";
import { api } from "./axios";

export async function getProducers(): Promise<Array<Producer>> {
  const { data: response } = await api.get("/producers");

  const { data } = response;

  return data as Array<Producer>;
}

export async function getProducer(id: string): Promise<Producer> {
  const { data } = await api.get(`/producers/${id}`);

  return data as Producer;
}

export async function setProducer(input: ProducerFormData): Promise<Producer> {
  const { data } = await api.post("/producers", input);

  return data as Producer;
}

export async function updateProducer(
  input: UpdateProducerFormData
): Promise<Producer> {
  const { data } = await api.put(`/producers/${input.id}`, input);

  return data as Producer;
}
