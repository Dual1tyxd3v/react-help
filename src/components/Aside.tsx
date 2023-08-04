/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import styled from 'styled-components';
import { useAppContext } from '../hooks/useAppContext';
import FoundedItem from './FoundedItem';
import { useCallback, useEffect, useState } from 'react';

type StyledAsideProps = {
  active: string;
};

const StyledAside = styled.aside<StyledAsideProps>`
  position: fixed;
  bottom: 2rem;
  right: -90%;
  width: 30rem;
  padding: 0.5rem 1rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.8);
  background-color: #000;
  transition: 0.3s all;

  ${(props) => props.active === 'active' && 'right: 2.4vw'}
`;

const AsideHeader = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 2rem;
  margin-bottom: 0.6rem;
`;

const Title = styled.h3`
  font-size: 1.8rem;
`;

const Anchor = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  right: 0.2rem;
  width: 2.8rem;
  border: none;
  background-color: var(--color-green);
  word-break: break-all;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 0.5rem 0.5rem;
  border-radius: 8px;

  & span {
    background-color: var(--color-main-light);
    border-radius: 50%;
    padding: 0 .5rem;
  }
`;

const Button = styled.button`
  color: var(--color-main-light);
  background-color: transparent;
  border: 2px solid var(--color-main-light);
  border-radius: 6px;
  padding: 1px 4px;
  line-height: 1;
  position: absolute;
  right: 0;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    color: var(--color-main-active);
    border: 2px solid var(--color-main-active);
    transform: scale(1.1);
  }
`;

export default function Aside() {
  const [activeButton, setActiveButton] = useState('');
  const { results } = useAppContext();
  const [isOpen, setIsOpen] = useState(true);

  // switch active buttons in aside block
  useEffect(() => {
    if (!results.length) {return;}

    setActiveButton(results[0][0]);
  }, [results]);

  const setActive = useCallback((label: string) => {
    setActiveButton(label);
  }, []);

  if (!results.length) {return null;}

  return (
    <>
      {!isOpen && (
        <Anchor onClick={() => setIsOpen((v) => !v)}>
          Founded : <span>{results.length}</span>
        </Anchor>
      )}
      <StyledAside active={isOpen ? 'active' : ''}>
        <AsideHeader>
          <Title>Founded: {results.length}</Title>
          <Button onClick={() => setIsOpen((v) => !v)}>x</Button>
        </AsideHeader>
        <ul>
          {results.map((result) => (
            <FoundedItem
              key={result[0]}
              data={result}
              active={activeButton === result[0]}
              setActive={setActive}
            />
          ))}
        </ul>
      </StyledAside>
    </>
  );
}
