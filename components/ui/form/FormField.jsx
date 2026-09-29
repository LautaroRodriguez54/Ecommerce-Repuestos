import style from './form.module.css'
export const FormField = ({
    type = "text",
    nameLabel,
    placeHolder,
    element = "input",
}) => {
    const Element = element;
    return(
        <>
        <label className={style.label} htmlFor={nameLabel}></label>
        <Element
        className={style.input}
        type={type}
        placeholder={placeHolder}
      />
        </>
    );
};
