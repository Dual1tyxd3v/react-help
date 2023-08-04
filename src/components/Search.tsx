/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 10px 10px;
  outline: none;
  border-radius: 10px;
  font-size: 1.8rem;
  transition: 0.2s all;

  &:focus {
    transform: scale(1.1, 1.05);
    box-shadow: 2px 5px 10px rgba(220, 156, 27, 0.801);
  }

  &::placeholder {
    font-weight: 700;
    font-size: 1.8rem;
    color: var(--color-tab-bg);
    opacity: 0.5;
  }
`;

const Form = styled.form`
  width: 30%;
  min-width: 20rem;
`;

export default function Search() {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('Search...');
  const { setQuery: setGlobalQuery, results, resetResults } = useAppContext();
  const ref = useRef(null);

  useEffect(() => {
    ref.current && (ref.current as HTMLInputElement).focus();
  }, []);

  useEffect(() => {
    results.length && setPlaceholder(`Founded: ${results.length}`);
  }, [results]);

  function submitHandler(e: FormEvent) {
    e.preventDefault();

    if (!query){ return;}

    resetResults();
    setGlobalQuery(query);
    setQuery('');
  }

  return (
    <Form onSubmit={submitHandler}>
      <Input
        ref={ref}
        placeholder={placeholder}
        value={query}
        onChange={(e: ChangeEvent) => setQuery((e.target as HTMLInputElement).value)}
      />
    </Form>
  );
}
