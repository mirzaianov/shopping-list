'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Settings } from 'lucide-react';
import { Menu } from '@base-ui/react/menu';
import clsx from 'clsx';
import buttonStyles from '../../components/button.module.css';
import { authClient } from '../../lib/auth-client';
import styles from './account-menu.module.css';

const actionIconSize = 20;

type AccountMenuProps = {
  email: string;
  nickname: string;
};

export default function AccountMenu({ email, nickname }: AccountMenuProps) {
  const router = useRouter();
  const initials = nickname.slice(0, 2).toUpperCase();
  const actionBaseClassName = clsx(
    buttonStyles.button,
    buttonStyles.action,
    buttonStyles.actionFull,
    styles.action,
  );
  const settingsClassName = clsx(actionBaseClassName, buttonStyles.neutral);
  const signOutClassName = clsx(actionBaseClassName, buttonStyles.destructive);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/login');
  };

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label={`Open account menu for ${nickname}. Signed in.`}
        className={clsx(buttonStyles.button, styles.trigger)}
        title="Account menu"
      >
        {initials}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner align="end" className={styles.positioner} side="bottom" sideOffset={8}>
          <Menu.Popup className={styles.popup}>
            <Menu.Group className={styles.group}>
              <Menu.GroupLabel className={styles.identity}>
                <span className={styles.nickname}>{nickname}</span>
                <span className={styles.email}>{email}</span>
              </Menu.GroupLabel>
              <Menu.Separator className={styles.separator} />
              <Menu.LinkItem className={settingsClassName} render={<Link href="/settings" />}>
                <span className={buttonStyles.buttonTop}>
                  <Settings size={actionIconSize} />
                  Settings
                </span>
              </Menu.LinkItem>
              <Menu.Item className={signOutClassName} onClick={handleSignOut}>
                <span className={buttonStyles.buttonTop}>
                  <LogOut size={actionIconSize} />
                  Sign Out
                </span>
              </Menu.Item>
            </Menu.Group>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
