'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import Flex from 'components/atoms/Flex';
import { useGetCategories } from 'hooks/tasks';
import Button from 'components/atoms/Button';

type OptionType = { title: string; value: string };

export type Props = {
  onSelect?: (value: OptionType) => void;
  defaultValue?: string;
};

const Dropdown = ({ onSelect, defaultValue }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const [initialized, setInitialized] = useState<boolean>(false);

  const { data, isPending } = useGetCategories();

  const options = data?.map((item) => {
    return { title: item.title, value: item.id };
  });

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // defaultValue를 설정한 경우
  useEffect(() => {
    if (defaultValue && !initialized && !isPending) {
      const target = options?.find((option) => option.value === defaultValue);
      setSelectedOption(target);
      setInitialized(true);
    }
  }, [defaultValue, initialized, options, isPending]);

  // defaultValue 없을 땐 첫번째 항목 기본설정
  useEffect(() => {
    if (!defaultValue && !initialized && options) {
      setSelectedOption(options[0]);
      setInitialized(true);
    }
  }, [options, defaultValue, initialized]);

  // 외부영역 클릭 시 닫기
  const containerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container
      ref={containerRef}
      $direction="column"
      $gap={{ row: 0.75 }}
      $align="start"
    >
      <div style={{ width: '100%' }}>
        <Button
          isFull
          size="sm"
          color="midGray"
          onClick={toggleOpen}
          type="button"
          disabled={!options}
        >
          {selectedOption?.title}
        </Button>

        {options && (
          <OptionContainer $isOpen={isOpen}>
            {options?.map((option) => {
              return (
                <Item
                  key={option.value}
                  onClick={() => {
                    onSelect && onSelect(option);
                    setSelectedOption(option);
                    setIsOpen(false);
                  }}
                >
                  <StyledTypo
                    $isSelected={selectedOption?.value === option.value}
                  >
                    {option.title}
                  </StyledTypo>
                </Item>
              );
            })}
          </OptionContainer>
        )}
      </div>
    </Container>
  );
};

export default Dropdown;

const Container = styled(Flex)`
  position: relative;
  width: 150px;

  ${({ theme }) => theme.device.mobile} {
    width: 150px;
  }
`;

const OptionContainer = styled.ul<{ $isOpen: boolean }>`
  width: auto;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.midGray};
  padding: 0.75rem;
  margin-top: 1rem;
  box-shadow:
    -5px 0 0 0 black,
    5px 0 0 0 black,
    0 -5px 0 0 black,
    0 5px 0 0 black;

  // option list 길어지는 경우 임의처리
  max-width: 50vw;
  max-height: 32rem;
  overflow: auto;
  z-index: 3;
`;

const Item = styled.li`
  padding: 0.75rem 0.875rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.black9};
  }
`;

const StyledTypo = styled.p<{ $isSelected: boolean }>`
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.purple : theme.colors.black5};
`;
