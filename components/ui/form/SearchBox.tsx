import styles from "./form.module.css";
import Search from "@/components/icon/Search.jsx";

interface SearchBoxProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const SearchBox = ({
  placeholder = "Buscar...",
  value,
  onChange,
}: SearchBoxProps) => {
  return (
    <form
      className={styles.searchBox}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button className={styles.iconSearch} type="submit">
          <Search />
        </button>
      </div>
    </form>
  );
};