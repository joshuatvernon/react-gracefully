import { defaults } from 'react-sweet-state';

if (typeof window !== 'undefined') {
  defaults.devtools = true;
}

export * from './config';
export * from './global';
export * from './registry';
