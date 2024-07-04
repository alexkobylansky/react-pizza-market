import React, {useCallback, useRef, useState} from "react";
import styles from "./search.module.scss";
import {SearchContext} from "../App";
import CloseIcon from '@mui/icons-material/Close';
import debounce from "lodash/debounce";

interface SearchProps {

}

export const Search: React.FC<SearchProps> = () => {
  const [value, setValue] = useState("");
  // @ts-ignore
  const {setSearchValue} = React.useContext(SearchContext);

  const inputRef = useRef(null);

  const handleClickClear = () => {
    setValue("");
    setSearchValue("");
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  };

  const updateSearchValue = useCallback(
    debounce((str) =>{
      setSearchValue(str);
    }, 1000), []);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.searchBody}>
      <img src="./img/search.svg" alt="search icon" className={styles.icon}/>
      <input
        ref={inputRef}
        type="text"
        className={styles.root}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={handleChangeInput}
      />
      {value && <CloseIcon className={styles.closeIcon} onClick={handleClickClear}/>}
    </div>
  )
};