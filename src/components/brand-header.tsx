import type { ReactNode } from 'react';
import Image from 'next/image';
import styles from './brand-header.module.css';

type BrandHeaderProps = {
  action?: ReactNode;
};

export default function BrandHeader({ action }: BrandHeaderProps) {
  return (
    <div className={styles.header}>
      <Image
        aria-hidden="true"
        className={styles.logo}
        src="/atemoya-icon.svg"
        alt=""
        width={32}
        height={32}
      />
      <h1 className={styles.heading}>atemoya</h1>
      <div className={styles.action}>{action}</div>
    </div>
  );
}
