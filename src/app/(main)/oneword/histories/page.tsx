'use client';

import { useRouter } from 'next/navigation';
import { useGetUserIdInactiveOneWord } from 'hooks/oneword';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import Flex from 'components/atoms/Flex';
import StrokeBox from 'components/atoms/StrokeBox';
import dayjs from 'dayjs';
import styled from 'styled-components';
import Icon from 'components/atoms/icon/Icon';
import { useGetUserIdOnewordIdSubItems } from 'hooks/oneword';
import { useState } from 'react';
import Modal from 'components/molecules/Modal';
import Circle, { colors } from 'components/atoms/Circle';

const OnewordHistoriesPage = () => {
  const user = useAtomValue(userAtom);

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const { data: inactiveOneword } = useGetUserIdInactiveOneWord(user.id);
  const { data: subItems } = useGetUserIdOnewordIdSubItems({
    userId: user.id,
    onewordId: selectedId,
  });

  const router = useRouter();

  return (
    <Flex $direction="column" $gap={{ row: 30 }} $isFull>
      <Flex $isFull>
        <div style={{ cursor: 'pointer' }} onClick={() => router.back()}>
          <Icon color="black7" name="back" />
        </div>
      </Flex>
      <Flex $direction="column" $gap={{ row: 20 }} $isFull>
        {inactiveOneword?.map((item) => (
          <StrokeBox
            $pd={0.5}
            $bgColor="midGray"
            $isFull
            key={item.onewordId}
            style={{ cursor: 'pointer' }}
            onClick={() => setSelectedId(item.onewordId)}
          >
            <Flex $gap={{ column: 8 }}>
              <TitleTypo>{item.title}</TitleTypo>
              {item.startAt && (
                <DateTypo>{dayjs(item.startAt).format('YYYY/MM/DD')}</DateTypo>
              )}
              <DateTypo>~</DateTypo>
              {item.endAt && (
                <DateTypo>{dayjs(item.endAt).format('YYYY/MM/DD')}</DateTypo>
              )}
            </Flex>
          </StrokeBox>
        ))}
      </Flex>

      {selectedId && (
        <Modal
          open={!!selectedId}
          onClose={() => setSelectedId(undefined)}
          width={400}
          dimmed
        >
          <Flex $direction="column" $gap={{ row: 32 }} $isFull>
            <TitleTypo>SUB ITEMS</TitleTypo>

            <Flex $direction="column" $gap={{ row: 24 }} $isFull>
              {subItems?.map((item) => (
                <Flex $gap={{ column: 8 }} key={item.subitemId}>
                  <SubItemTypo $color={colors[Number(item.category)].color}>
                    {item.content}
                  </SubItemTypo>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Modal>
      )}
    </Flex>
  );
};

export default OnewordHistoriesPage;

const TitleTypo = styled.p`
  font-size: 20px;
`;
const DateTypo = styled.p`
  color: ${({ theme }) => theme.colors.black7};
`;
const SubItemTypo = styled.p<{ $color: string }>`
  color: ${({ $color }) => $color};
`;
