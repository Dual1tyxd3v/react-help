import styled from 'styled-components';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useScroll } from '../hooks/useScroll';
import { useAppContext } from '../hooks/useAppContext';

const Button = styled.button`
  position: fixed;
  left: 0;
  bottom: 10vh;
  background-color: transparent;
  border: none;
  cursor: pointer;

  & svg {
    stroke: var(--color-green);
    fill: var(--color-green);
    width: 3rem;
    height: 3rem;
  }
`;

export default function LiftUp() {
  const setElement = useScroll();
  const { searchElement } = useAppContext();

  function clickHandler() {
    setElement(0);
    searchElement?.focus();
  }

  return (
    <Button onClick={clickHandler}>
      <PiMagnifyingGlassBold />
    </Button>
  );
}
