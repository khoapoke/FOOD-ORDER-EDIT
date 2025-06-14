import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, ...props }, ref) {
  return (
    <div className="control">
      <label htmlFor={props.id}>{label}</label>
      <input ref={ref} {...props} />
    </div>
  );
});

export default Input; 