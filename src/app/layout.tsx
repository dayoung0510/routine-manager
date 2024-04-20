'use client';

import { useEffect } from 'react';
import StyledComponentsRegistry from 'lib/registry';
import { GlobalStyle } from 'styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  useEffect(() => {
    document.title = 'Routine Manager';
  }, []);

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <StyledComponentsRegistry>
            <GlobalStyle />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
