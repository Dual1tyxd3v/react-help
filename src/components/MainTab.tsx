/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ContentTab from './ContentTab';
import { useAppContext } from '../hooks/useAppContext';

type StyledMainTabProps = {
  type: string;
};

const StyledMainTab = styled.div<StyledMainTabProps>`
  background-color: var(--color-tab-bg);
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  border-bottom: 1px solid var(--color-main-active);
  border-top: 1px solid var(--color-main-active);
  padding: 1rem 3rem;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }

  &:hover {
    color: var(--color-tab-bg);
    background-color: var(--color-main-light);
  }

  ${(props) =>
    props.type === 'active' &&
    css`
      background-color: var(--color-tab-main-active);
    `}
`;

type ContentContainerProps = {
  active: string;
};

const ContentContainer = styled.div<ContentContainerProps>`
  display: none;

  ${(props) =>
    props.active &&
    css`
      display: block;
    `}
`;

type MainTabProps = {
  label: string;
  content: string[][];
};

export default function MainTab({ label, content }: MainTabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { results } = useAppContext();
  const ref = useRef(null);

  useEffect(() => {
    if (!results.length) {
      return;
    }

    results.some((result) => {
      const [resultName] = result[0].split('/');
      return resultName === label;
    })
      ? setIsOpen(true)
      : setIsOpen(false);
  }, [results, label]);

  const formatedLabel = `${isOpen ? '-' : '+'} ${label} (${content.length})`;
  const sortedContent = [...content].sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <>
      <StyledMainTab ref={ref} type={isOpen ? 'active' : ''} onClick={() => setIsOpen((v) => !v)}>
        {formatedLabel}
      </StyledMainTab>
      <ContentContainer active={isOpen ? 'active' : ''}>
        {sortedContent.map((post) => (
          <ContentTab parent={label} key={`content_${post[0]}`} content={post} />
        ))}
      </ContentContainer>
    </>
  );
}
