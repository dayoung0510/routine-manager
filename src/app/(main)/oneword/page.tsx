'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Flex from 'components/atoms/Flex';
import styled from 'styled-components';
import StrokeBox from 'components/atoms/StrokeBox';
import Icon from 'components/atoms/icon/Icon';
import {
  useGetUserIdInactiveOneWord,
  useGetUserIdActiveOneWord,
  usePostUserIdOneWord,
} from 'hooks/oneword';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import Modal from 'components/molecules/Modal';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import Pin from 'components/molecules/Pin';

const OnewordPage = () => {
  const user = useAtomValue(userAtom);

  // 기존데이터 불러오기
  const { data: activeOneword } = useGetUserIdActiveOneWord(user.id);

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // oneword 수정
  const { mutate } = usePostUserIdOneWord();

  return (
    <Flex $direction="column" $gap={{ row: 12 }}>
      <Flex $gap={{ column: 4 }}>
        <IconWrapper onClick={() => setOpen(true)}>
          <Icon name="edit" size={20} />
        </IconWrapper>
      </Flex>

      {activeOneword && activeOneword[0].title && (
        <ContentTypo $gap={{ column: 16 }}>
          <Icon name="quoteL" size={18} color="black7" />
          {activeOneword?.[0].title}
          <Icon name="quoteR" size={18} color="black7" />
        </ContentTypo>
      )}

      <button onClick={() => router.push('/oneword/histories')}>
        히스토리 보기
      </button>

      {open && (
        <Modal open={open} onClose={() => setOpen(false)} width={300} dimmed>
          <ModalContainer $direction="column">
            <Flex $direction="column" $align="start" $gap={{ row: 12 }} $isFull>
              <Row>
                <span>TITLE</span>
                <Input
                  defaultValue={activeOneword?.[0].title ?? ''}
                  ftColor="black3"
                  bdColor="black3"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Row>

              <Row>
                <span>START DATE</span>
                <Input
                  defaultValue={activeOneword?.[0].startAt ?? ''}
                  placeholder="Please enter 8 digits."
                  ftColor="black3"
                  bdColor="black3"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Row>

              <Row>
                <span>END DATE</span>
                <Input
                  defaultValue={activeOneword?.[0].endAt ?? ''}
                  placeholder="Please enter 8 digits."
                  ftColor="black3"
                  bdColor="black3"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Row>
            </Flex>

            <ConfirmButtonWrapper>
              <Button
                size="sm"
                color="blue"
                isFull
                onClick={() => {
                  if (user.id) {
                    mutate({
                      userId: user.id,
                      title,
                      startAt: 'aaa',
                      endAt: 'bbb',
                    });
                  }
                }}
              >
                CONFIRM
              </Button>
            </ConfirmButtonWrapper>
          </ModalContainer>
        </Modal>
      )}
    </Flex>
  );
};

export default OnewordPage;

const ContentTypo = styled(Flex)`
  font-size: 2rem;
`;
const IconWrapper = styled.div`
  cursor: pointer;
`;

const ModalContainer = styled(Flex)`
  color: #000;
`;
const ConfirmButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 2px;

  span {
    font-size: 0.7rem;
  }
`;
