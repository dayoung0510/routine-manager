'use client';

import { useState } from 'react';
import styled from 'styled-components';
import SelectIcon from 'components/organisms/login/SelectIcon';
import EnterPinCode from 'components/organisms/login/EnterPinCode';
import { TransitionGroup, Transition } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

type TransitionType = 'entering' | 'entered' | 'exiting';
const TIMEOUT = 150;
const getTransitionStyles: Record<TransitionType, any> = {
  entering: {
    position: 'absolute',
    opacity: 0,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
  },
};

export default function LoginPage() {
  const [id, setId] = useState('');

  const handleReset = () => {
    setId('');
  };

  return (
    <Container>
      <TransitionGroup style={{ position: 'relative' }}>
        <Transition
          key={uuidv4()}
          timeout={{
            enter: TIMEOUT,
            exit: TIMEOUT,
          }}
        >
          {(status) => {
            return (
              <div
                style={{
                  ...getTransitionStyles[status as TransitionType],
                }}
              >
                {!id ? (
                  <SelectIcon onClick={setId} />
                ) : (
                  <EnterPinCode id={id} handleReset={handleReset} />
                )}
              </div>
            );
          }}
        </Transition>
      </TransitionGroup>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
`;
