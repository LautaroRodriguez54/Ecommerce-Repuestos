import style from './form.module.css'
export const FormField = ({
    type = "text",
    name='',
    placeHolder,
    element = "input",
    required = false,
}) => {
    const Element = element;
    return(
        <>
        <label className={style.label} htmlFor={name}></label>
        <Element
        className={style.input}
        type={type}
        placeholder={placeHolder}
        name={name}
        required={required}
      />
        </>
    );
};
