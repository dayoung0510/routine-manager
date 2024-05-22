'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onChange: (value: string) => void;
};

const MAX_LENGTH = 4;

const Pin = ({ onChange }: Props) => {
  const [pin, setPin] = useState(new Array(MAX_LENGTH).fill(''));
  const [focusIndex, setFocusIndex] = useState(0);

  const inputRefs = useRef<Array<HTMLInputElement | null>>(
    Array.from({ length: 4 }, () => null),
  );

  const handleChange = (currentIndex: number, value: string) => {
    console.log(value, '...');
    setPin((prev) => {
      return [
        ...prev.slice(0, currentIndex),
        value.charAt(value.length - 1),
        ...prev.slice(currentIndex + 1),
      ];
    });

    if (currentIndex !== MAX_LENGTH - 1) {
      setFocusIndex(currentIndex + 1);
    }
  };

  const handleBackspace = (currentIndex: number) => {
    if (currentIndex >= 1) {
      // 이미 채워진값이 있을 때
      if (pin[currentIndex]) {
        setPin((prev) => {
          return [
            ...prev.slice(0, currentIndex),
            '',
            ...prev.slice(currentIndex + 1),
          ];
        });
        setFocusIndex(currentIndex);
      }
      // 빈칸에서 백스페이스 눌렀을 때
      else {
        setPin((prev) => {
          return [
            ...prev.slice(0, currentIndex - 1),
            '',
            ...prev.slice(currentIndex),
          ];
        });
        setFocusIndex(currentIndex - 1);
      }
    }
  };

  useEffect(() => {
    const result = pin.reduce((acc, curr) => acc + curr, '');
    onChange(result);
    inputRefs.current[focusIndex]?.focus();
  }, [pin, onChange, focusIndex]);

  return (
    <Wrapper>
      {pin.map((value, index) => {
        return (
          <StyledInput key={uuidv4()}>
            <input
              type="text"
              maxLength={2}
              value={value}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
              onChange={(e) => {
                if (e.target.value.length > 1) {
                  const lastChar = e.target.value.slice(-1);
                  return handleChange(index, lastChar);
                }
                const isNumber = /^[0-9]$/.test(e.target.value);
                if (isNumber) {
                  return handleChange(index, e.target.value);
                }
              }}
              ref={(el) => {
                if (el) {
                  inputRefs.current[index] = el as HTMLInputElement;
                }
              }}
            />
          </StyledInput>
        );
      })}
    </Wrapper>
  );
};

export default Pin;

const Wrapper = styled.div`
  display: flex;
  column-gap: 20px;
`;

const StyledInput = styled.div`
  width: 48px;
  height: 48px;
  border: 0;
  border-bottom: 4px solid ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) =>
    theme.device.mobile &&
    css`
      width: 36px;
      height: 36px;
    `}

  input {
    font-size: 24px;
    text-align: center;
    background: 0;
    width: 24px;
    height: 24px;
    outline: 0;
    border: 0;

    ${({ theme }) =>
      theme.device.mobile &&
      css`
        width: 18px;
        height: 18px;
        font-size: 18px;
      `}
  }
`;
