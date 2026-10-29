import style from "./form.module.css";
import type { SelectBoxProps } from "@/types/pagination";

export const SelectBox = ({
  option,
  label = "",
  icon,
  value,
  onChange,
}: SelectBoxProps) => {
  return (
    <div className={style.selectBox}>
      {(label || icon) && (
        <label>
          {icon && <div className={style.icon}>{icon}</div>}
          {label}
        </label>
      )}
      <select className={style.input} value={value} onChange={onChange}>
        {option.map((item, i) => (
          <option value={item} key={i}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
