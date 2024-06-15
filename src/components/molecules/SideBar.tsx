import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';
import { useMediaQuery } from 'hooks/useMediaQuery';
import { useAtomValue } from 'jotai';
import { userAtom } from 'atoms/user';

const menus = [
  { index: 0, title: 'TODO', link: '/' },
  { index: 1, title: 'DASHBOARD', link: 'dashboard' },
  { index: 2, title: 'RANK', link: 'rank' },
  { index: 3, title: 'SETTING', link: 'setting' },
];

const SideBar = () => {
  const isMobile = useMediaQuery();

  const user = useAtomValue(userAtom);

  return (
    <Container>
      [ {user.name} ]
      {user.avatar && (
        <Image src={user.avatar} width={30} height={30} alt="avatar" />
      )}
      {menus.map((menu) => (
        <Link key={menu.index} href={menu.link}>
          <Item>{menu.title}</Item>
        </Link>
      ))}
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 15rem;
  height: 100%;
  font-size: 1.5rem;
  border-right: 4px solid ${({ theme }) => theme.colors.lightGray};

  background-color: ${({ theme }) => theme.colors.black1};
  color: #fff;

  ${({ theme }) => theme.device.mobile} {
    width: auto;
    height: auto;
    flex-direction: row;
    column-gap: 1rem;
    overflow-x: auto;
    padding: 1rem 0.5rem;
    justify-content: center;
    border-right: 0;
  }
`;

const Item = styled.div``;
