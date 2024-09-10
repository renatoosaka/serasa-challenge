import { forwardRef, PropsWithChildren, SelectHTMLAttributes } from "react";

interface Props
  extends SelectHTMLAttributes<HTMLSelectElement>,
    PropsWithChildren {
  label?: string;
}

export const FormInputSelect = forwardRef<HTMLSelectElement, Props>(
  ({ label, children, ...props }, ref) => {
    return (
      <div className="flex items-center w-full p-2 mb-4 border border-gray-300 rounded">
        {label && <label className="min-w-40">{label}</label>}
        <select ref={ref} {...props} className="w-full px-4 py-2 bg-gray-100">
          {children}
        </select>
      </div>
    );
  }
);
