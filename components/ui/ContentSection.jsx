import style from './ui.module.css';
export const ContentSection =({title, children})=>{
    return(
        <div className={style.contentWrapper}>
            <h1>{title}</h1>
            {children}
        </div>
    );

}