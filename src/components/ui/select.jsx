import React from "react";

export function Select({ children, ...props }) {
  return <select className="w-full p-2 border rounded-lg" {...props}>{children}</select>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
