import style from './modal.module.css';
export default function ModalContainer({title, children}){
    return (
        <>
        <div className={style.ModalContainer}>
            <div className={style.title}>
                <p>{title}</p>
            </div>
            <div className={style.form}>
                {children}
            </div>
        </div>
        </>
    );
}