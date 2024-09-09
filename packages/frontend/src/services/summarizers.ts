import { CharData } from "../types/charts";
import { ChartsBy, TotalBy } from "../types/summarizers";
import { api } from "./axios";

export async function getChartBy(type: ChartsBy) {
  const { data } = await api.get(`/summarizers/charts?type=${type}`);

  return data as Array<CharData>;
}

export async function getTotalBy(type: TotalBy) {
  const { data } = await api.get(`/summarizers/total?type=${type}`);

  return data;
}
