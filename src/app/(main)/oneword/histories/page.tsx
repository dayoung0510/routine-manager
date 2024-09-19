'use client';

import { useGetUserIdInactiveOneWord } from 'hooks/oneword';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';
import Flex from 'components/atoms/Flex';
import StrokeBox from 'components/atoms/StrokeBox';

const OnewordHistoriesPage = () => {
  const user = useAtomValue(userAtom);
  const { data: inactiveOneword } = useGetUserIdInactiveOneWord(user.id);

  return (
    <Flex $direction="column" $gap={{ row: 20 }} $isFull>
      {inactiveOneword?.map((item) => (
        <StrokeBox $pd={0.5} $isFull key={item.onewordId}>
          {item.title}
        </StrokeBox>
      ))}
    </Flex>
  );
};

export default OnewordHistoriesPage;
