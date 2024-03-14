/* eslint-disable camelcase */
import { JQUERY } from './JQUERY_Data';
import { Css } from './css';
import { Git } from './git';
import { Html } from './html';
import { Javascript } from './javascript';
import { Logic } from './logic';
import { ReactData } from './react';
import { Sass } from './sass';
import { TypeScript } from './typescript';
import { Unit_Tests } from './unit-tests';
import {Vue} from './vue';

const data = {
  Git,
  Html,
  Css,
  Javascript,
  JQUERY,
  React: ReactData,
  Sass,
  Logic,
  TypeScript,
  'Unit tests': Unit_Tests,
  Vue
};

export default data;
