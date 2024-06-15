'use client';

import { useState } from 'react';
import styled from 'styled-components';
import SelectIcon from 'components/organisms/login/SelectIcon';
import { TransitionGroup, Transition } from 'react-transition-group';
import EnterMemberInfo from 'components/organisms/login/EnterMemberInfo';
import { v4 as uuidv4 } from 'uuid';
import { PAGE_TURN_TIMEOUT } from 'constants/constants';

type TransitionType = 'entering' | 'entered' | 'exiting';

const getTransitionStyles: Record<TransitionType, any> = {
  entering: {
    position: 'absolute',
    opacity: 0,
  },
  entered: {
    transition: `opacity ${PAGE_TURN_TIMEOUT}ms ease-in-out, transform ${PAGE_TURN_TIMEOUT}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${PAGE_TURN_TIMEOUT}ms ease-in-out, transform ${PAGE_TURN_TIMEOUT}ms ease-in-out`,
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
            enter: PAGE_TURN_TIMEOUT,
            exit: PAGE_TURN_TIMEOUT,
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
                  <EnterMemberInfo id={id} handleReset={handleReset} />
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
