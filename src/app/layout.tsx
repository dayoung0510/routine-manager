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
import { getBorderStyle } from 'components/atoms/StrokeBox';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const pathname = usePathname();

  useEffect(() => {
    document.title = '정신차려 이 각박한 세상 속에서';
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
              <Container>{children}</Container>
              <StyledContainer
                position="bottom-center"
                autoClose={2000}
                toastClassName={'custom'}
              />
            </ThemeProvider>
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;

  ${({ theme }) => theme.device.mobile} {
    height: auto;
  }
`;

const StyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    border-radius: 0;
    background-color: ${({ theme }) => theme.colors.lightGray};
    ${getBorderStyle(2, 1, 'black0', 'red')}
  }
  .Toastify__toast-body {
    font-family: 'Dung', sans-serif;
    color: ${({ theme }) => theme.colors.red};
  }
  .Toastify__progress-bar {
    background: ${({ theme }) => theme.colors.red};
  }
`;
