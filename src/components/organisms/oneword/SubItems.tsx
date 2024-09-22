import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';
import Button from 'components/atoms/Button';
import Flex from 'components/atoms/Flex';
import Input from 'components/atoms/Input';
import {
  useGetUserIdOnewordIdSubItems,
  usePostUserIdOnewordIdSubItem,
  usePutUserIdOnewordIdSubItem,
  useDeleteUserIdOnewordIdSubItem,
  usePutSubItemStatus,
} from 'hooks/oneword';
import { useState } from 'react';
import Icon from 'components/atoms/icon/Icon';
import { toast } from 'react-toastify';
import { OnewordSubItemType } from 'apis/apis';
import Modal from 'components/molecules/Modal';

type SubItemsProps = {
  userId: string;
  onewordId: string;
};

const colors = [
  { id: '0', color: '#eb5454' },
  { id: '1', color: '#f9ab3e' },
  { id: '2', color: '#369128' },
];

const SubItems = ({ userId, onewordId }: SubItemsProps) => {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<
    OnewordSubItemType | undefined
  >(undefined);

  const [text, setText] = useState('');
  const [subCategory, setSubCategory] = useState<string | undefined>(undefined);

  const { data } = useGetUserIdOnewordIdSubItems({ userId, onewordId });

  // 서브아이템 추가
  const { mutate: createSubItem } = usePostUserIdOnewordIdSubItem();
  const handleClickAdd = () => {
    if (!subCategory) {
      return toast.error('PLEASE SELECT THE CATEGORY');
    }
    if (!text) {
      return toast.error('PLEASE ENTER THE TEXT');
    }
    createSubItem(
      { userId, onewordId, category: subCategory, content: text },
      {
        onSuccess: () => {
          toast.success('SUCCESS!');
          setText('');
        },
      },
    );
  };

  // 서브아이템 수정
  const { mutate: editSubItem } = usePutUserIdOnewordIdSubItem();
  const handleEditItem = () => {
    if (selectedItem) {
      editSubItem(
        {
          userId,
          onewordId,
          subitemId: selectedItem.subitemId,
          category: selectedItem.category,
          content: selectedItem.content,
        },
        {
          onSuccess: () => {
            toast.success('SAVED!');
            setSelectedItem(undefined);
          },
        },
      );
    }
  };

  // 서브아이템 삭제
  const { mutate: deleteSubItem } = useDeleteUserIdOnewordIdSubItem();
  const handleClickDelete = () => {
    if (selectedItem) {
      deleteSubItem(
        { userId, onewordId, subitemId: selectedItem?.subitemId },
        {
          onSuccess: () => {
            toast.success('DELETED!');
            setSelectedItem(undefined);
          },
        },
      );
    }
  };

  // isDone 상태변경
  const { mutate: toggleStatus } = usePutSubItemStatus();
  const handleClickStatus = () => {
    if (selectedItem) {
      toggleStatus(
        {
          userId,
          onewordId,
          subitemId: selectedItem.subitemId,
          isDone: !selectedItem.isDone,
        },
        {
          onSuccess: () => {
            toast.success('STATUS CHANGED!');
            setSelectedItem(undefined);
          },
        },
      );
    }
  };

  const categorizedData = data?.reduce((acc: { [key: string]: any }, cur) => {
    // 카테고리 키가 이미 존재하는지 확인
    if (!acc[cur.category]) {
      acc[cur.category] = []; // 없으면 새로운 배열 생성
    }
    // 해당 카테고리에 item 추가
    acc[cur.category].push(cur);
    return acc;
  }, {} as OnewordSubItemType);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Flex
        $direction="column"
        $gap={{ row: 36 }}
        $isFull
        style={{ marginTop: '36px' }}
      >
        <Flex $gap={{ column: 16 }}>
          <Pallete $gap={{ column: 16 }}>
            {colors.map(({ color, id }) => (
              <Circle
                key={color}
                $bg={color}
                onClick={() => setSubCategory(id)}
                $isActive={subCategory === id}
              />
            ))}
          </Pallete>
          <Input
            ftColor="black3"
            bdColor="black3"
            placeholder="ADD SUB ITEM"
            value={text ?? ''}
            onChange={(e) => setText(e.target.value)}
          />
          <div onClick={handleClickAdd}>
            <Icon name="check" />
          </div>
        </Flex>

        <Grid>
          {colors.map((colorGrid) => (
            <GridItem key={colorGrid.id} $color={colorGrid.color}>
              {categorizedData &&
                categorizedData[colorGrid.id] &&
                categorizedData[colorGrid.id].map((i: OnewordSubItemType) => {
                  return (
                    <Item
                      key={i.subitemId}
                      $isDone={i.isDone}
                      onClick={() => {
                        setSelectedItem(i);
                      }}
                    >
                      {i.content}
                    </Item>
                  );
                })}
            </GridItem>
          ))}
        </Grid>
      </Flex>

      {selectedItem?.subitemId && (
        <Modal
          open={!!selectedItem?.subitemId}
          onClose={() => setSelectedItem(undefined)}
          width={400}
          dimmed
        >
          <Flex $direction="column" $gap={{ row: 32 }} $isFull>
            <Flex $gap={{ column: 16 }} $justify="start" $isFull>
              {colors.map((color) => {
                return (
                  <Circle
                    key={color.id}
                    $bg={color.color}
                    $isActive={color.id === selectedItem.category.toString()}
                    onClick={() =>
                      setSelectedItem({
                        ...selectedItem,
                        category: color.id,
                      })
                    }
                  />
                );
              })}
            </Flex>
            <Input
              ftColor="black5"
              bdColor="black5"
              defaultValue={selectedItem?.content ?? ''}
              style={{ width: '100%' }}
              onChange={(e) => {
                setSelectedItem({ ...selectedItem, content: e.target.value });
              }}
            />

            <Flex $direction="column" $gap={{ row: 16 }} $isFull>
              <Flex $gap={{ column: 16 }} $isFull>
                <Button
                  color="yellow"
                  isFull
                  size="sm"
                  onClick={handleClickStatus}
                >
                  CHANGE STATUS
                </Button>
              </Flex>
              <Flex $gap={{ column: 16 }} $isFull>
                <Button
                  size="sm"
                  color="red"
                  isFull
                  onClick={handleClickDelete}
                >
                  DELETE
                </Button>
                <Button size="sm" color="blue" isFull onClick={handleEditItem}>
                  CONFIRM
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Modal>
      )}
    </div>
  );
};

export default SubItems;

const Pallete = styled(Flex)``;

const Circle = styled.div<{ $bg: string; $isActive?: boolean }>`
  width: 12px;
  height: 12px;

  background-color: ${({ $bg }) => $bg};

  box-shadow:
    4px 0 #222,
    -4px 0 #222,
    0 -4px #222,
    0 4px #222;

  ${({ $isActive }) =>
    $isActive &&
    css`
      box-shadow:
        4px 0 #222,
        -4px 0 #222,
        0 -4px #222,
        0 4px #222,
        0 0 0 8px ${({ theme }) => theme.colors.blue},
        0 0 0 8px ${({ theme }) => theme.colors.blue},
        0 0 0 8px ${({ theme }) => theme.colors.blue},
        0 0 0 8px ${({ theme }) => theme.colors.blue};
    `}
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 24px;
  column-gap: 24px;
`;

const GridItem = styled.div<{ $color: string }>`
  width: 100%;
  padding: 16px;
  color: ${({ $color }) => $color};
  text-align: center;

  display: flex;
  flex-direction: column;
  row-gap: 16px;
`;

const Item = styled.div<{ $isDone: boolean }>`
  cursor: pointer;

  ${({ $isDone, theme }) => {
    return (
      $isDone &&
      css`
        text-decoration: line-through;
        color: ${theme.colors.black9};
      `
    );
  }}
`;
