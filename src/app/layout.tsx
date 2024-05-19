'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styled from 'styled-components';
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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  useEffect(() => {
    document.title = 'Routine Manager';
  }, []);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // 로그인정보 없으면 로그인페이지로
      if (!user) {
        return router.push('/login');
      } else {
        // 로그인됐는데 로그인페이지 접근시 메인페이지로
        if (pathname === '/login') {
          return router.push('/');
        }
      }
    });
  }, [auth, pathname]);

  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <StyledComponentsRegistry>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              <Container>
                {children}
                {modal}
              </Container>
            </ThemeProvider>
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

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
