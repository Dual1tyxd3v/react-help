/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import data from '../data/data';
import MainTab from './MainTab';
import data from '../data/data';

export default function Main() {
  const preparedData = Object.keys(data);

  return (
    <div>
      {preparedData.map((theme) => (
        <MainTab key={`main_${theme}`} label={theme} content={data[theme as keyof typeof data]} />
      ))}
    </div>
  );
}
