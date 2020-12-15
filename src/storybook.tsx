import React, { FunctionComponent, useEffect, useState } from 'react';
import Select, { ActionMeta, InputActionMeta, ValueType } from 'react-select';

import { GraceProvider, GraceProviderProps } from './components/provider';
import { DevicesState, initialGlobalState, Orientation } from './stores';
import { keys } from './utils';

const Divider = () => <hr style={{ border: 'none' }} />;

const Label: FunctionComponent<{ value: string; size: 'sm' | 'md' | 'lg' }> = (props) => {
  const { size, value } = props;
  switch (size) {
    case 'sm':
      return <p style={{ marginTop: '0px', marginBottom: '10px', fontSize: '15px', color: '#E48BAA' }}>{value}</p>;
    case 'md':
      return <p style={{ marginTop: '0px', marginBottom: '10px', fontSize: '17.5px', color: '#D8628F' }}>{value}</p>;
    case 'lg':
      return <p style={{ marginTop: '0px', marginBottom: '10px', fontSize: '20px' }}>{value}</p>;
  }
};

const SelectDevices = (props: { devices: DevicesState; setDevices: (devices: DevicesState) => void }) => {
  const { devices: oldDevices, setDevices: setOldDevices } = props;

  const [device, setDevice] = useState('_');
  const [devices, setDevices] = useState(oldDevices);

  useEffect(() => {
    setOldDevices(devices);
  }, [devices]);

  const handleInputChange = (input: string, inputActionMeta: InputActionMeta) => {
    if (inputActionMeta.action === 'input-change') {
      setDevice(input);
    } else if (inputActionMeta.action === 'set-value') {
      setDevices({
        ...devices,
        [device]: false
      });
      setOldDevices({
        ...devices,
        [device]: false
      });
    }
  };

  const handleChange = (
    _value: ValueType<{ label: string; value: string }, true>,
    actionMeta: ActionMeta<{ label: string; value: string }>
  ) => {
    if (actionMeta.action === 'remove-value' && actionMeta.removedValue) {
      const newDevices = devices;
      delete newDevices[actionMeta.removedValue.label];
      setDevice('_');
      setDevices(newDevices);
      setOldDevices(newDevices);
    }
  };

  return (
    <Select
      isMulti
      name="devices"
      defaultValue={keys(oldDevices).map((device: string) => ({ label: device, value: device }))}
      options={keys({ ...oldDevices, [device]: false })
        .filter((device: string) => device !== '_')
        .map((device: string) => ({ label: device, value: device }))}
      noOptionsMessage={() => 'Type and submit to create new devices'}
      onInputChange={handleInputChange}
      onChange={handleChange}
    />
  );
};

const CheckDevices = (props: { devices: DevicesState; setDevices: (devices: DevicesState) => void }) => {
  const { devices, setDevices } = props;
  return (
    <>
      {keys(devices).map((device) => {
        return (
          <span key={device}>
            <span>{device}</span>
            <input
              type="checkbox"
              checked={devices[device]}
              onChange={() => {
                setDevices({
                  ...devices,
                  [device]: !devices[device]
                });
              }}
            />
            {'  '}
          </span>
        );
      })}
    </>
  );
};

const SelectWindowSize = (props: { windowSize: string; setWindowSize: (windowSize: string) => void }) => {
  const { windowSize, setWindowSize } = props;
  const handleWindowSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWindowSize(event.target.value);
  };
  return <input value={windowSize} onChange={handleWindowSizeChange} />;
};

const SelectOrientation = (props: { setOrientation: (orientation: Orientation) => void }) => {
  const { setOrientation } = props;
  const handleOrientationChange = (value: ValueType<{ label: string; value: string }, false>) => {
    setOrientation(value ? (value.value as Orientation) : Orientation.Portait);
  };
  return (
    <Select
      name="orientation"
      defaultValue={{
        label: initialGlobalState.window.orientation,
        value: initialGlobalState.window.orientation
      }}
      options={[
        { label: 'portrait', value: 'portrait' },
        { label: 'landscape', value: 'landscape' }
      ]}
      onChange={handleOrientationChange}
    />
  );
};

const GraceOptions: FunctionComponent<GraceProviderProps> = (props) => {
  const { scope, children } = props;

  const [showModal, setShowModal] = useState(false);
  const [width, setWidth] = useState('1024px');
  const [height, setHeight] = useState('768px');
  const [orientation, setOrientation] = useState<Orientation>(Orientation.Portait);
  const [devices, setDevices] = useState<DevicesState>(initialGlobalState.devices);

  const graceProviderProps: GraceProviderProps = {
    scope,
    devices,
    window: {
      width,
      height,
      orientation
    }
  };

  return (
    <>
      <button
        style={{
          position: 'absolute',
          right: '20px',
          top: '20px',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
          borderRadius: '5px',
          display: showModal ? 'none' : 'block'
        }}
        onClick={() => setShowModal(true)}
      >
        Settings
      </button>
      <div
        style={{
          position: 'absolute',
          width: 'calc(100% - 40px)',
          background: 'white',
          top: '20px',
          left: '20px',
          right: '20px',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
          borderRadius: '5px',
          display: showModal ? 'block' : 'none'
        }}
      >
        <div
          style={{
            padding: '10px',
            background: 'rgba(228, 139, 170, 0.2)',
            borderRadius: '5px'
          }}
        >
          <button
            style={{ float: 'right', border: 'none', background: 'none', fontSize: '20px' }}
            onClick={() => setShowModal(false)}
          >
            x
          </button>
          <Label size="lg" value="Settings" />
          <div>
            <Label size="md" value="Devices" />
            <div>
              <Label size="sm" value="Devices" />
              <SelectDevices devices={devices} setDevices={setDevices} />
              <Divider />
              <Label size="sm" value="Current Devices" />
              <CheckDevices devices={devices} setDevices={setDevices} />
              <Divider />
            </div>
          </div>
          <div>
            <Label size="md" value="Window" />
            <div>
              <Label size="sm" value="Width" />
              <SelectWindowSize windowSize={width} setWindowSize={setWidth} />
              <Divider />
              <Label size="sm" value="Height" />
              <SelectWindowSize windowSize={height} setWindowSize={setHeight} />
              <Divider />
              <Label size="sm" value="Orientation" />
              <SelectOrientation setOrientation={setOrientation} />
            </div>
          </div>
        </div>
      </div>
      <GraceProvider {...graceProviderProps}>{children}</GraceProvider>
    </>
  );
};

/* eslint-disable react/display-name */
export const withSettings = (scope?: string) => (story: () => JSX.Element): JSX.Element => (
  <GraceOptions scope={scope}>{story()}</GraceOptions>
);
