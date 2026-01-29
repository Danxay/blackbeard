'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <SWRConfig
            value={{
                // Global SWR config for optimization
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
                dedupingInterval: 60000, // 1 minute - prevent duplicate requests
                errorRetryCount: 2,
                shouldRetryOnError: false,
            }}
        >
            {children}
        </SWRConfig>
    );
}
