'use client';

import { useState, type ReactNode } from 'react';
import { Tooltip } from '@base-ui/react/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type QueryProviderProps = {
  children: ReactNode;
};

export default function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Tooltip.Provider>{children}</Tooltip.Provider>
    </QueryClientProvider>
  );
}
