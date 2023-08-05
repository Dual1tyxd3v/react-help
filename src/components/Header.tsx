import styled from 'styled-components';
import Search from './Search';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 2rem 0;
  color: inherit;
`;

const Title = styled.h1`
  letter-spacing: 3.5px;
  line-height: 1;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Title>Справочник</Title>
      <Search />
    </StyledHeader>
  );
}
