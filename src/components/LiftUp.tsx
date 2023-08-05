import styled from 'styled-components';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useScroll } from '../hooks/useScroll';

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

  return (
    <Button onClick={() => setElement(0)}>
      <PiMagnifyingGlassBold />
    </Button>
  );
}
