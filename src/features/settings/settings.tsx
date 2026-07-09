import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DeleteAccountDialog from './delete-account-dialog';
import styles from './settings.module.css';

const buttonSmall = 24;

type SettingsProps = {
  userEmail: string;
};

export default function Settings({ userEmail }: SettingsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link className={styles.iconLink} href="/" title="Back to shopping list">
          <ArrowLeft size={buttonSmall} />
        </Link>
        <span className={styles.email} title="Your email">
          {userEmail}
        </span>
      </div>
      <h1 className={styles.heading}>Settings</h1>
      <section className={styles.options} aria-labelledby="account-settings">
        <div className={styles.optionRow}>
          <h2 className={styles.optionTitle} id="account-settings">
            Account
          </h2>
          <DeleteAccountDialog userEmail={userEmail} />
        </div>
      </section>
    </div>
  );
}
