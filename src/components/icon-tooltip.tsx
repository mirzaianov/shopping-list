'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { ReactElement } from 'react';

import styles from './icon-tooltip.module.css';

interface IconTooltipProps {
  children: ReactElement<Record<string, unknown>>;
  label: string;
}

export default function IconTooltip({ children, label }: IconTooltipProps) {
  return (
    <BaseTooltip.Root>
      <BaseTooltip.Trigger render={children} />
      <BaseTooltip.Portal>
        <BaseTooltip.Positioner className={styles.positioner} collisionPadding={8} sideOffset={6}>
          <BaseTooltip.Popup className={styles.popup}>{label}</BaseTooltip.Popup>
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
}
