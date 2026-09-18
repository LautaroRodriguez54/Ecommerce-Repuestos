import style from '../ui.module.css'
const FormField=({
    type = "text",
    nameLabel,
    placeHolder,
    element = "input",
})=>{
    const Element = element;
    /*nameLabel nombre del dato que se enviará en el formulario*/
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
export {FormField};