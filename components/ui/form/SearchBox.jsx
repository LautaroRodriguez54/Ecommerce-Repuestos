import styles from './form.module.css';
import Search from '@/components/icon/Search.jsx'
export const SearchBox = ({ placeholder }) => {
  return (
    <form className={styles.searchBox}>
      <div className={styles.inputWrapper}>
        <input className={styles.input} type="text" name="" placeholder={placeholder} />
        <button className={styles.iconSearch}>
          <Search />
        </button>
      </div>
    </form>
  );
};
