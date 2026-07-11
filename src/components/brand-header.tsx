import type { ReactNode } from 'react';
import Image from 'next/image';
import styles from './brand-header.module.css';

type BrandHeaderProps = {
  action?: ReactNode;
  isHeading?: boolean;
};

export default function BrandHeader({ action, isHeading = true }: BrandHeaderProps) {
  const wordmark = <span className={styles.wordmark}>atemoya</span>;

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
      {isHeading ? (
        <h1 className={styles.heading}>{wordmark}</h1>
      ) : (
        <div className={styles.heading}>{wordmark}</div>
      )}
      <div className={styles.action}>{action}</div>
    </div>
  );
}
