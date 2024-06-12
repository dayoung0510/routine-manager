'use client';

import styled from 'styled-components';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default LoginLayout;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #3e3e3e;
`;
