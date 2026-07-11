import Link from 'next/link';
import Image from 'next/image';
import { House } from 'lucide-react';
import buttonStyles from '../../components/button.module.css';
import DeleteAccountDialog from './delete-account-dialog';
import NicknameEditDialog from './nickname-edit-dialog';
import styles from './settings.module.css';

const buttonSmall = 20;

type SettingsProps = {
  userEmail: string;
  userNickname: string;
};

export default function Settings({ userEmail, userNickname }: SettingsProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          aria-hidden="true"
          className={styles.logo}
          src="/atemoya-icon.svg"
          alt=""
          width={32}
          height={32}
        />
        <h1 className={styles.heading}>
          <span className={styles.headingText}>atemoya</span>
        </h1>
        <span aria-hidden="true" className={styles.headerSpacer} />
      </div>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="settings-nickname">
            Nickname
          </label>
          <div className={styles.fieldRow}>
            <input
              className={styles.input}
              id="settings-nickname"
              type="text"
              readOnly
              value={userNickname}
            />
            <NicknameEditDialog currentNickname={userNickname} />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="settings-email">
            Email
          </label>
          <input
            className={styles.input}
            id="settings-email"
            type="email"
            readOnly
            value={userEmail}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="settings-password">
            Password
          </label>
          <input
            className={styles.input}
            id="settings-password"
            type="password"
            autoComplete="off"
            readOnly
            value="********"
          />
        </div>
      </div>
      <section className={styles.options} aria-labelledby="account-settings">
        <div className={styles.optionRow}>
          <h2 className={styles.optionTitle} id="account-settings">
            Account
          </h2>
          <DeleteAccountDialog userEmail={userEmail} />
        </div>
      </section>
      <Link className={`${buttonStyles.button} ${buttonStyles.homeLink}`} href="/">
        <House size={buttonSmall} />
        Go Home
      </Link>
    </div>
  );
}
