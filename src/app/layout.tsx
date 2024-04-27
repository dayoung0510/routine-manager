'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import StyledComponentsRegistry from 'lib/registry';
import { GlobalStyle } from 'styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'apis/firebase';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  useEffect(() => {
    document.title = 'Routine Manager';
  }, []);

  const router = useRouter();

  // 로그인정보 없으면 로그인페이지로 보내기
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return router.push('/login');
      } else if (user && pathname === '/login') {
        return router.push('/');
      }
    });
  }, [auth, pathname]);

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <StyledComponentsRegistry>
            <GlobalStyle />
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              theme="dark"
              style={{ width: 'fit-content' }}
            />
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
