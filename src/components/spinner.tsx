import { LoaderCircle } from 'lucide-react';

import styles from './spinner.module.css';

interface SpinnerProps {
  size?: number;
}

export default function Spinner({ size = 20 }: SpinnerProps) {
  return <LoaderCircle aria-hidden="true" className={styles.spinner} size={size} />;
}
