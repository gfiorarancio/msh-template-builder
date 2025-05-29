
import React from "react";

export function Select({ children, ...props }) {
  return <select className="w-full p-2 border rounded-lg" {...props}>{children}</select>;
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }) {
  return <option disabled>{placeholder}</option>;
}
