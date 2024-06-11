import styled from 'styled-components';
import Link from 'next/link';

const menus = [
  { index: 0, title: 'TODO', link: '/' },
  { index: 1, title: 'DASHBOARD', link: 'dashboard' },
  { index: 2, title: 'RANK', link: 'rank' },
  { index: 3, title: 'SETTING', link: 'setting' },
];

const SideBar = () => {
  return (
    <Container>
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
  border-right: 1px solid ${({ theme }) => theme.colors.black};
`;

const Item = styled.div``;
