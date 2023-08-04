/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createContext, useCallback, useEffect, useState } from 'react';
import GlobalStyles from './GlobalStyles';
import { ContextState, ResultType } from './types';
import styled from 'styled-components';
import Header from './components/Header';
import Main from './components/Main';
import { useScroll } from './hooks/useScroll';
import Aside from './components/Aside';
import LiftUp from './components/LiftUp';

export const AppContext = createContext<null | ContextState>(null);

const StyledApp = styled.div`
  width: 94vw;
  min-width: 40rem;
  min-height: 94vh;
  margin: 0 auto;
  background-color: var(--color-main-bg);
  border-radius: 10px;
`;

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ResultType[]>([]);
  const setElement = useScroll();
  const [scroll, setScroll] = useState(0);

  // add search results into the store
  const addResults = useCallback(
    (result: ResultType) => setResults((prev) => [...prev, result]),
    []
  );
  function handleScroll () {
    setScroll(window.scrollY);
  }

  // observe window scrolling for liftup render
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const resetResults = useCallback(() => setResults([]), []);

  // scroll to the 1st founded result
  useEffect(() => {
    if (!results.length) {return;}

    setElement(results[0][1]);
  }, [results, setElement]);

  return (
    <AppContext.Provider value={{ query, setQuery, results, addResults, resetResults, setElement }}>
      <GlobalStyles />
      <StyledApp>
        <Header />
        <Main />
        <Aside />
        {scroll > 150 && <LiftUp />}
      </StyledApp>
    </AppContext.Provider>
  );
}

export default App;
