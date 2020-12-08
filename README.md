# react-gracefully 🦢

**react-gracefully** is a utility for gracefully rendering react server side.

[![npm version](https://badge.fury.io/js/react-gracefully.svg)](https://badge.fury.io/js/react-gracefully) [![Build Status](https://travis-ci.com/joshuatvernon/react-gracefully.svg?branch=main)](https://travis-ci.com/joshuatvernon/react-gracefully) [![vulnerabilities](https://snyk.io/test/github/joshuatvernon/react-gracefully/badge.svg)](https://snyk.io/test/github/joshuatvernon/react-gracefully)

## Installation

```sh
npm install react-gracefully
```

## Usage

### Middleware

#### Default (UserAgent)

The **react-gracefully** express middleware by default will use the `user-agent` to sniff the current device type.

```typescript
import express from 'express';
import grace from 'react-gracefully';

const app = express();
app.use(grace.express());
```

#### Headers

Optionally, **react-gracefully** express middleware can be configured to check custom headers for the current device type.

```typescript
import express from 'express';
import grace, { Config, Headers } from 'react-gracefully';

const app = express();

const config: Config = {
    mobile: (headers: Headers) => headers['x-device-type'] === 'mobile',
    tablet: (headers: Headers) => headers['x-device-type'] === 'tablet',
    desktop: (headers: Headers) => headers['x-device-type'] === 'desktop',
    ios: (headers: Headers) => headers['x-device-type'] === 'ios',
    android: (headers: Headers) => headers['x-device-type'] === 'android'
};
app.use(grace.express());
```

### Hook

#### Devices

```jsx
import { useGrace } from 'react-gracefully';

export const Page = () => {
    const { is } = useGrace();
    const isMobile = is.mobile();
    const isTablet = is.tablet();
    const isDesktop = is.tablet();
    const isAndroid = is.device('android');
    return (
        <>
            {isAndroid && <h2>Android Title</h2>}
            {isMobile && <h2>Mobile Title</h2>}
            {(isTablet || isDesktop) && <h1>Tablet or Desktop Title</h1>}
        </>
    )
};
```

#### Breakpoints

```jsx
import { useGrace } from 'react-gracefully';

export const Page = () => {
    const { is } = useGrace();
    const isAboveSmall = is.above.breakpoint('sm');
    const isBelowLarge = is.below.breakpoint('lg');
    const isMedium = is.current.breakpoint('md');
    return (
        <>
            {isAboveSmall && isBelowLarge && isMedium && <h2>Medium Title</h2>}
        </>
    )
};
```

#### Window

```jsx
import { useGrace } from 'react-gracefully';

export const Page = () => {
    const { is } = useGrace();
    const isWindowHeightAbove2em = is.above.window.height('2em');
    const isWindowWidthBelow500px = is.below.window.width('500px');
    const isLandscape = is.current.window.landscape();
    return (
        <>
            {isWindowHeightAbove2em && isWindowWidthBelow500px && isLandscape && <h2>Landscape Medium Title</h2>}
        </>
    )
};
```

### Components

#### Provider

```jsx
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
    )
};
```

#### Show

```jsx
import { Show } from 'react-gracefully';

export const Page = () => {
    return (
        <>
            <Show show={['mobile']}>
                <h2>Mobile Title</h2>
            </Show>
            <Show show={['tablet', 'desktop']}>
                <h1>Tablet or Desktop Title</h1>
            </Show>
        </>
    )
};
```

#### Hide

```jsx
import { Hide } from 'react-gracefully';

export const Page = () => {
    return (
        <>
            <Hide hide={['mobile']}>
                <h1>Tablet or Desktop Title</h1>
            </Hide>
            <Hide hide={['tablet', 'desktop']}>
                <h2>Mobile Title</h2>
            </Hide>
        </>
    )
};
```


## Copyright

[MIT](./LICENSE)
