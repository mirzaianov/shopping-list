'use client';

import { Tooltip } from '@base-ui/react/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <Tooltip.Provider>{children}</Tooltip.Provider>
    </QueryClientProvider>
  );
}
