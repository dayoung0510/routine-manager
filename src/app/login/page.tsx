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

  const resetId = () => {
    setId('');
  };

  console.log('1 콘솔 로그', process.env.NODE_ENV);
  console.info('2 콘솔 정보');
  console.debug('3 콘솔 디버그');
  console.warn('4 콘솔 경고');
  console.error('5 콘솔 오류');
  console.table('6 콘솔 테이블');
  console.group('7 콘솔 그룹');
  console.time('8 콘솔 타이머');
  console.count('9 콘솔 카운드');

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
          {(status) => (
            <div
              style={{
                ...getTransitionStyles[status as TransitionType],
              }}
            >
              {!id ? (
                <SelectIcon onClick={setId} />
              ) : (
                <EnterPinCode id={id} resetId={resetId} />
              )}
            </div>
          )}
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
