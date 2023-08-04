/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import styled, { css } from 'styled-components';
import { ResultType } from '../types';
import { useAppContext } from '../hooks/useAppContext';

type ButtonProps = {
  active: string;
};

const Li = styled.li`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Button = styled.button<ButtonProps>`
  display: inline-block;
  width: 100%;
  background-color: var(--color-green-light);
  font-weight: 700;
  border: none;
  font-size: 1.6rem;
  border-radius: 6px;
  padding: 0.4rem 0;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background-color: var(--color-main-active);
  }

  ${(props) =>
    props.active === 'active' &&
    css`
      background-color: var(--color-green);
      color: #fff;
    `}
`;

type FoundedItemProps = {
  data: ResultType;
  active: boolean;
  setActive: (v: string) => void;
};

export default function FoundedItem({ data, active, setActive }: FoundedItemProps) {
  const {setElement} = useAppContext();
  const [label, ref] = data;

  function clickHandler() {
    setActive(label);

    setElement(ref);
  }
  return (
    <Li>
      <Button active={active ? 'active' : ''} onClick={clickHandler}>
        {label}
      </Button>
    </Li>
  );
}
