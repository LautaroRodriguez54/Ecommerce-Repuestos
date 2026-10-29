import style from "./form.module.css";
type FormFieldProps = {
  type?: string;
  name?: string;
  placeHolder?: string;
  element?: "input" | "textarea";
  required?: boolean;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};
export const FormField = ({
  type = "text",
  name = "",
  placeHolder,
  element = "input",
  required = false,
  value,
  onChange,
}: FormFieldProps) => {
  const Element = element;
  return (
    <>
      <label className={style.label} htmlFor={name}></label>
      <Element
        className={style.input}
        {...(element === "input" ? { type } : {})}
        placeholder={placeHolder}
        name={name}
        required={required}
        {...(value !== undefined ? { value } : {})}
        onChange={onChange}
      />
    </>
  );
};
