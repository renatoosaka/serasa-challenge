import { ResponsivePie } from "@nivo/pie";
import { CharData } from "../../types/charts";

interface Props {
  data: Array<CharData>;
  title: string;
}
export function PieChart({ data, title }: Props) {
  return (
    <div className="w-full p-2 aspect-square">
      <div className="flex items-center justify-center p-2 mb-4 font-bold bg-gray-100 rounded">
        <span className="text-sm text-gray-600">{title}</span>
      </div>

      <ResponsivePie
        data={data}
        margin={{ top: 8, right: 40, bottom: 8, left: 40 }}
        arcLinkLabelsOffset={-40}
        arcLinkLabelsDiagonalLength={8}
        arcLinkLabelsStraightLength={8}
        arcLinkLabelsTextOffset={2}
        id="label"
        // colors={{ datum: "data.color" }}
      />
    </div>
  );
}
