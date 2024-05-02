import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onChange: (value: number) => void;
};

const MAX_LENGTH = 4;

const Pin = () => {
  const [pin, setPin] = useState(new Array(MAX_LENGTH).fill(''));
  const [focusIndex, setFocusIndex] = useState(0);

  const inputRefs = Array.from({ length: 4 }, () =>
    useRef<HTMLInputElement>(null!),
  );

  const handleChange = (currentIndex: number, value: string) => {
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

  useEffect(() => {
    inputRefs[focusIndex].current.focus();
  }, [inputRefs]);

  return (
    <Wrapper>
      {pin.map((value, index) => {
        return (
          <StyledInput key={uuidv4()}>
            <input
              type="text"
              value={value}
              maxLength={2}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={inputRefs[index]}
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
  column-gap: 10px;
`;

const StyledInput = styled.div`
  width: 36px;
  height: 36px;
  border: 1px solid yellow;

  input {
    width: 100%;
    height: 100%;
    outline: 0;
    border: 0;
  }
`;
