'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Flex from 'components/atoms/Flex';
import styled from 'styled-components';
import Icon from 'components/atoms/icon/Icon';
import { useGetUserIdActiveOneWord, usePostUserIdOneWord } from 'hooks/oneword';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import Modal from 'components/molecules/Modal';
import Input from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import SubItems from 'components/organisms/oneword/SubItems';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const OnewordPage = () => {
  const user = useAtomValue(userAtom);

  // 기존데이터 불러오기
  const { data: activeOneword } = useGetUserIdActiveOneWord(user.id);

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');

  // oneword 수정
  const { mutate } = usePostUserIdOneWord();

  return (
    <Flex $direction="column" $gap={{ row: 8 }} style={{ height: '100%' }}>
      {activeOneword && activeOneword[0]?.title && (
        <IconWrapper onClick={() => router.push('/oneword/histories')}>
          <Icon color="black7" name="clock" />
        </IconWrapper>
      )}

      <TitleDateContainer
        $direction="column"
        $gap={{ row: 6 }}
        onClick={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      >
        {activeOneword && activeOneword.length < 1 && (
          <div>CLICK TO CREATE</div>
        )}
        {activeOneword && activeOneword[0]?.title && (
          <ContentTypo $gap={{ column: 16 }}>
            <Icon name="quoteL" size={18} color="black7" />
            {activeOneword?.[0].title}
            <Icon name="quoteR" size={18} color="black7" />
          </ContentTypo>
        )}

        <Flex $gap={{ column: 8 }}>
          {activeOneword && activeOneword[0]?.startAt && (
            <p>
              {dayjs(activeOneword && activeOneword[0]?.startAt).format(
                'YYYY/MM/DD',
              )}
            </p>
          )}
          {activeOneword && activeOneword[0]?.endAt && (
            <>
              <p>~</p>
              <p>
                {dayjs(activeOneword && activeOneword[0]?.endAt).format(
                  'YYYY/MM/DD',
                )}
              </p>
            </>
          )}
        </Flex>
      </TitleDateContainer>

      {user && user.id && activeOneword && activeOneword?.[0]?.onewordId && (
        <SubItems userId={user.id} onewordId={activeOneword[0].onewordId} />
      )}

      {open && (
        <Modal open={open} onClose={() => setOpen(false)} width={300} dimmed>
          <ModalContainer $direction="column">
            <Flex $direction="column" $align="start" $gap={{ row: 12 }} $isFull>
              <Row>
                <span>TITLE</span>
                <Input
                  defaultValue={activeOneword?.[0]?.title ?? ''}
                  placeholder="WHAT IS YOUR ONE WORD?"
                  ftColor="black3"
                  bdColor="black3"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Row>

              <Row>
                <span>START DATE</span>
                <Input
                  defaultValue={activeOneword?.[0]?.startAt ?? ''}
                  placeholder="ENTER 8 DIGITS"
                  ftColor="black3"
                  bdColor="black3"
                  onChange={(e) => setStartAt(e.target.value)}
                />
              </Row>

              <Row>
                <span>END DATE</span>
                <Input
                  defaultValue={activeOneword?.[0]?.endAt ?? ''}
                  placeholder="ENTER 8 DIGITS"
                  ftColor="black3"
                  bdColor="black3"
                  onChange={(e) => setEndAt(e.target.value)}
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
                    mutate(
                      {
                        userId: user.id,
                        title,
                        startAt,
                        endAt,
                      },
                      {
                        onSuccess: () => {
                          setOpen(false);
                          toast.success('SAVED!');
                        },
                      },
                    );
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

const IconWrapper = styled.div`
  cursor: pointer;
`;

const TitleDateContainer = styled(Flex)`
  p {
    color: ${({ theme }) => theme.colors.black7};
  }
`;
