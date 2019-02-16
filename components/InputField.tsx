import React, { InputHTMLAttributes } from "react";
import { FieldProps } from "formik";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({
  field,
  form: { errors, touched },
  ...props
}: FieldProps & InputProps) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <div>
      <input {...field} {...props} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};
