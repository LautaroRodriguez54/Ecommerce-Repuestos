import style from "./form.module.css";
export const SelectBox = ({ option, label, icon }) => {
  return (
    <div className={style.selectBox}>
      <label>
        {icon && <div className={style.icon}>{icon}</div>}
        {label}
      </label>
      <select name="" className={style.input}>
        {...option.map((item, i) => {
          return (
            <option value={item} key={i}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
