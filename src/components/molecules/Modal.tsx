import Image from 'next/image';
import styled, { css } from 'styled-components';
import Cancel from '../../../public/icons/cancel.png';
import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  head?: React.ReactNode;
  width?: number;
  height?: number;
  showCloseButton?: boolean;
};

const Modal = ({
  children,
  onClose,
  head,
  width,
  height,
  open,
  showCloseButton = true,
}: Props) => {
  return (
    <Bg $open={open}>
      <Wrapper>
        <StyledModal $width={width} $height={height}>
          {showCloseButton && (
            <Image
              src={Cancel}
              width={24}
              height={24}
              alt="close"
              style={{ position: 'absolute', top: '-36px', right: '-4px' }}
              onClick={onClose}
            />
          )}

          {head && <StyledModalHead>{head}</StyledModalHead>}
          <StyledModalBody>{children}</StyledModalBody>
        </StyledModal>
      </Wrapper>
    </Bg>
  );
};

export default Modal;

const Bg = styled.div<{ $open: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: ${(props) => (props.$open ? 'block' : 'none')};
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const StyledModal = styled.div<{ $width?: number; $height?: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 0.5rem;
  width: ${(props) => `${props.$width}px` ?? 'auto'};
  height: ${(props) => `${props.$height}px` ?? 'auto'};

  /* pixel art style border */
  box-shadow:
    -10px 0 0 0 black,
    10px 0 0 0 black,
    0 -10px 0 0 black,
    0 10px 0 0 black;
`;

const StyledModalHead = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledModalBody = styled.div`
  color: #000;
  padding: 0.5rem;
  height: 100%;

  & * {
    color: inherit;
  }
`;
