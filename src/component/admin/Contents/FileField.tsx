import type { InputHTMLAttributes } from "react";
import React from "react";
import { Field } from "react-final-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const FileField = ({ name, ...props }: Props) => (
  <Field<FileList> name={name}>
    {({ input: { value, onChange, ...input } }) => (
      <div className="input-group mb-3">
      <input required className="form-control"
        {...input}
        type="file"
        onChange={({ target }) => onChange(target.files)} 
        {...props}
      />
      </div>
    )}
  </Field>
);

export default FileField;
