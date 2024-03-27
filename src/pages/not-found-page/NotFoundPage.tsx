import React from 'react';
import styles from "./not-found-page.module.scss";

export const NotFoundPage = () => {
  return (
    <div className="container">
      <h1 className={styles.header}>
        <span>😕</span><br/>
        Ничего не найдено</h1>
      <p className={styles.description}>
        К сожалению, данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  )
};