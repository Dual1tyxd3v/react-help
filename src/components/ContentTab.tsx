import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useAppContext } from '../hooks/useAppContext';

type StyledContentTabProps = {
  type: string;
};

const StyledContentTab = styled.div<StyledContentTabProps>`
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  background-color: var(--color-main-active);
  color: var(--color-main-bg);
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  transition: 0.4s all;

  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }

  &:hover {
    background-color: var(--color-main-light);
    padding-left: 3rem;
  }

  ${(props) =>
    props.type === 'active' &&
    css`
      background-color: var(--color-content-active);
      text-align: center;

      &:hover {
        background-color: var(--color-content-active);
        text-decoration: underline;
        padding-left: 1.5rem;
        letter-spacing: 2px;
      }
    `}
`;

type ContentProps = {
  active: string;
};

const Content = styled.div<ContentProps>`
  background-color: var(--color-content-bg);
  font-size: 1.6rem;
  padding: 1rem 3rem;
  display: none;

  & b {
    color: var(--color-main-active);
    display: inline-block;
    margin: 0.5rem auto;
    text-align: center;
  }

  ${(props) =>
    props.active === 'active' &&
    css`
      display: block;
    `}
`;

const ContentWrapper = styled.div`
  margin: 0.5rem 3rem;
`;

type ContentTabProps = {
  content: string[];
  parent: string;
};

export default function ContentTab({ content, parent }: ContentTabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { query, addResults } = useAppContext();
  const ref = useRef(null);
  const tabRef = useRef<null | HTMLDivElement>(null);

  const [label, post] = content;
  const formatedLabel = `${isOpen ? '' : '+'} ${label}`;
  const href = `#content_${label.replace(/ /g, '')}`;

  // if content or title includes query then add this tab to results
  useEffect(() => {
    if (!query || !ref.current) {
      return;
    }

    if (
      (tabRef.current &&
        (ref.current as HTMLDivElement).textContent?.toLowerCase().includes(query.toLowerCase())) ||
      (tabRef.current as HTMLDivElement).textContent?.toLowerCase().includes(query.toLowerCase())
    ) {
      setIsOpen(true);
      addResults([`${parent}/${label}`, tabRef.current as HTMLDivElement]);
    } else {
      setIsOpen(false);
    }
  }, [query, post, addResults, label, parent, href]);

  return (
    <ContentWrapper>
      <StyledContentTab
        type={isOpen ? 'active' : ''}
        ref={tabRef}
        onClick={() => setIsOpen((v) => !v)}
        dangerouslySetInnerHTML={{ __html: formatedLabel }}
      />
      <Content
        active={isOpen ? 'active' : ''}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: post }}
      />
    </ContentWrapper>
  );
}
