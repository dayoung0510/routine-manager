import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import { useMediaQuery } from 'hooks/useMediaQuery';

const menus = [
  { index: 0, title: 'ONEWORD', link: '/' },
  { index: 1, title: 'DAILY', link: '/daily' },
  { index: 2, title: 'DASHBOARD', link: '/dashboard' },
  { index: 3, title: 'HISTORIES', link: '/histories' },
];

const SideBar = () => {
  const isMobile = useMediaQuery();
  // const pathname = usePathname()?.slice(1);
  const pathname = usePathname()?.split('/')[1];

  return (
    <Container>
      {menus.map((menu) => {
        const lowerCase = menu.title.toLowerCase();
        const current = pathname.includes(lowerCase);

        return (
          <Link key={menu.index} href={menu.link}>
            <Item $current={current}>{menu.title}</Item>
          </Link>
        );
      })}
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  width: 14rem;
  height: 100%;
  font-size: 1.5rem;
  border-right: 2px dashed ${({ theme }) => theme.colors.black5};
  padding: 1rem;

  /* background-color: ${({ theme }) => theme.colors.lightGray}; */
  color: ${({ theme }) => theme.colors.darkGray};

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

const Item = styled.div<{ $current: boolean }>`
  color: ${(props) =>
    props.$current ? props.theme.colors.black1 : props.theme.colors.black9};
`;
