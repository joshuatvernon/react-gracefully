import { StoreActionApi } from 'react-sweet-state';

export interface DevicesState {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  [key: string]: boolean;
}

export enum Orientation {
  Portait = 'portrait',
  Landscape = 'landscape'
}

export interface WindowState {
  width: string;
  height: string;
  orientation: 'portrait' | 'landscape' | Orientation;
}

export interface GlobalState {
  devices: DevicesState;
  window: WindowState;
}

export type GlobalSelectorProps = {
  initialState: GlobalState;
};

export type GlobalStoreApi = StoreActionApi<GlobalState>;
