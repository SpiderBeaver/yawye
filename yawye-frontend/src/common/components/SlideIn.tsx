import React, { PropsWithChildren } from 'react';
import styles from './SlideIn.module.css';

type SlideInProps = PropsWithChildren<{ show: boolean }>;

export default function SlideIn({ show, children }: SlideInProps) {
  return <div className={`${styles.slideIn} ${show ? styles.onScreen : ''}`}>{children}</div>;
}
