# react-gracefully 🦢

<p align="center">
  <img src="https://user-images.githubusercontent.com/16813547/101833625-1bebd580-3aee-11eb-95b6-be06c2254207.png" alt="react-gracefully logo" height="150" />
</p>

<h1 align="center">react-gracefully</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/react-gracefully">
    <img src="https://img.shields.io/npm/v/react-gracefully.svg">
  </a>
  <a href="https://bundlephobia.com/result?p=react-gracefully">
    <img src="https://img.shields.io/bundlephobia/minzip/react-gracefully.svg" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg">
  </a>
  <a href="https://travis-ci.com/joshuatvernon/react-gracefully">
    <img src="https://travis-ci.com/joshuatvernon/react-gracefully.svg?branch=main">
  </a>
  <a href="https://codecov.io/gh/joshuatvernon/react-gracefully">
    <img src="https://codecov.io/gh/joshuatvernon/react-gracefully/branch/main/graph/badge.svg?token=ZKLQ2C1EOF"/>
  </a>
  <a href="https://snyk.io/test/github/joshuatvernon/react-gracefully">
    <img src="https://snyk.io/test/github/joshuatvernon/react-gracefully/badge.svg" />
    <a/>
</p>
<p align="center">
  <img src="./badges/badge-branches.svg" />
  <img src="./badges/badge-functions.svg" />
  <img src="./badges/badge-lines.svg" />
  <img src="./badges/badge-statements.svg" />
</p>

A library for gracefully rendering responsive React client or server side.

## Installation

```sh
npm install --save react-gracefully
```

## Usage

### `useGrace` hook

**react-gracefully** exposes the `useGrace` hook to get access to _devices_, _breakpoints_ and _window_ details.

#### Devices

Here is an example of how to use the `useGrace` hook to access _device_ details.

```jsx
import React from 'react';
import { useGrace } from 'react-gracefully';

export const Page = () => {
  const { is } = useGrace();
  const isMobile = is.mobile();
  const isTablet = is.tablet();
  const isDesktop = is.tablet();
  const isAndroid = is.device('android');
  return (
    <div>
      {isAndroid && <h2>Android Title</h2>}
      {isMobile && <h2>Mobile Title</h2>}
      {(isTablet || isDesktop) && <h1>Tablet or Desktop Title</h1>}
    </div>
  );
};
```

#### Breakpoints

Here is an example of how to use the `useGrace` hook to access _breakpoint_ details.

```jsx
import React from 'react';
import { useGrace } from 'react-gracefully';

export const Page = () => {
  const { is } = useGrace();
  const isAboveSmall = is.above.breakpoint('sm');
  const isBelowLarge = is.below.breakpoint('lg');
  const isMedium = is.current.breakpoint('md');
  return <div>{isAboveSmall && isBelowLarge && isMedium && <h2>Medium Title</h2>}</div>;
};
```

#### Window

Here is an example of how to use the `useGrace` hook to access _window_ details.

```jsx
import React from 'react';
import { useGrace } from 'react-gracefully';

export const Page = () => {
  const { is } = useGrace();
  const isWindowHeightAbove2em = is.above.window.height('2em');
  const isWindowWidthBelow500px = is.below.window.width('500px');
  const isLandscape = is.current.window.landscape();
  return (
    <div>{isWindowHeightAbove2em && isWindowWidthBelow500px && isLandscape && <h2>Landscape Medium Title</h2>}</div>
  );
};
```

### Components

**react-gracefully** exposes a number of components. These components can be used to setup the configuration or show or hide content server side.

#### `Show` component

The `Show` component can be used to show content for specific _breakpoints_ or _devices_. Since it uses media queries under the hood all content is returned from the server to the client and then hidden or shown using css. This means it can be used effectively in server side rendered apps such as [Next.js](https://github.com/vercel/next.js/).

```jsx
import React from 'react';
import { Show } from 'react-gracefully';

export const Page = () => {
  return (
    <div>
      <Show show={['mobile']}>
        <h2>Mobile Title</h2>
      </Show>
      <Show show={['tablet', 'desktop']}>
        <h1>Tablet or Desktop Title</h1>
      </Show>
    </div>
  );
};
```

#### `Hide` component

The `Hide` component can be used to hide content for specific _breakpoints_ or _devices_. Since it uses media queries under the hood all content is returned from the server to the client and then hidden or shown using css. This means it can be used effectively in server side rendered apps such as [Next.js](https://github.com/vercel/next.js/).

```jsx
import React from 'react';
import { Hide } from 'react-gracefully';

export const Page = () => {
  return (
    <div>
      <Hide hide={['mobile']}>
        <h1>Tablet or Desktop Title</h1>
      </Hide>
      <Hide hide={['tablet', 'desktop']}>
        <h2>Mobile Title</h2>
      </Hide>
    </div>
  );
};
```

#### `GraceProvider` component

The `GraceProvider` component is used to scope and configure **use-gracefully** for the app. It allows custom _breakpoints_ and/or _devices_ to be configured.

```jsx
import React from 'react';
import { GraceProvider } from 'react-gracefully';

export const App = () => {
  const breakpoints: Breakpoints = {
    sm: {
      max: '500px'
    },
    md: {
      min: '500px',
      max: '1000px'
    },
    lg: {
      min: '1000px'
    }
  };
  const devices = ['mobile', 'ios', 'android', 'tablet', 'desktop'];
  return (
    <GraceProvider breakpoints={breakpoints} devices={devices}>
      <Router />
    </GraceProvider>
  );
};
```

### Express Middleware

#### Default (UserAgent)

The **react-gracefully** express middleware by default will use the `user-agent` to sniff the current device type.

```typescript
import express from 'express';
import grace from 'react-gracefully';

const app = express();
app.use(grace.express());
```

#### Custom (Headers)

Optionally, **react-gracefully** express middleware can be configured to check custom headers for the current device type.

```typescript
import express from 'express';
import grace, { Config, Headers } from 'react-gracefully';

const app = express();
const config: Config = {
  devices: {
    mobile: (headers: Headers) => headers['x-device-type'] === 'mobile',
    tablet: (headers: Headers) => headers['x-device-type'] === 'tablet',
    desktop: (headers: Headers) => headers['x-device-type'] === 'desktop',
    ios: (headers: Headers) => headers['x-device-type'] === 'ios',
    android: (headers: Headers) => headers['x-device-type'] === 'android'
  }
};
app.use(grace.express(config));
```

## Copyright

[MIT](./LICENSE)
