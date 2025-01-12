import Image from 'next/image';
import styled, { css } from 'styled-components';
import Cancel from '../../../public/icons/cancel.png';
import React, { useEffect, useRef } from 'react';
import Icon from 'components/atoms/icon/Icon';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  head?: React.ReactNode;
  width?: number;
  height?: number;
  showCloseButton?: boolean;
  dimmed?: boolean;
};

const Modal = ({
  children,
  onClose,
  head,
  width,
  height,
  open,
  showCloseButton = true,
  dimmed = false,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // dim 영역 클릭 시 close
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (ref.current === e.target && dimmed) {
      onClose();
    }
  };

  // 외부(배경) 컴포넌트 스크롤 막기
  useEffect(() => {
    if (open) {
      document.body.style.cssText = `position: fixed`;
    } else {
      document.body.style.cssText = `position: relative`;
    }

    return () => {
      document.body.style.cssText = `position: relative`;
    };
  }, [open]);

  return (
    <Bg $open={open} $dimmed={dimmed}>
      <Wrapper>
        <div
          ref={ref}
          style={{ position: 'relative', width: '100%', height: '100%' }}
          onClick={handleClose}
        >
          <StyledModal $width={width} $height={height}>
            {showCloseButton && (
              <CloseIconWrapper onClick={onClose}>
                <Icon name="close" />
              </CloseIconWrapper>
            )}
            {head && <StyledModalHead>{head}</StyledModalHead>}
            <StyledModalBody>{children}</StyledModalBody>
          </StyledModal>
        </div>
      </Wrapper>
    </Bg>
  );
};

export default Modal;

const Bg = styled.div<{ $open: boolean; $dimmed: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: ${(props) => (props.$open ? 'block' : 'none')};

  ${({ $dimmed }) =>
    $dimmed &&
    css`
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 2;
    `}
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
  width: ${(props) => `${props.$width}px`};
  height: ${(props) => `${props.$height}px`};

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

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
