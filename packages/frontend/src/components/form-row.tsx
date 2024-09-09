import { PropsWithChildren } from "react";

export function FormRow({ children }: PropsWithChildren) {
  return <div className="flex">{children}</div>;
}
