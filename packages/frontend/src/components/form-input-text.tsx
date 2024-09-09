import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const FormInputText = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex items-center w-full p-2 mb-4 border border-gray-300 rounded">
        {label && <label className="min-w-40">{label}</label>}
        <input ref={ref} {...props} className="w-full px-4 py-2 bg-gray-100" />
      </div>
    );
  }
);
