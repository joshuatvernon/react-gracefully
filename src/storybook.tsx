import React, { FunctionComponent, useEffect, useState } from 'react';
import Select, { ActionMeta, InputActionMeta, ValueType } from 'react-select';
import cloneDeep from 'lodash.clonedeep';

import { GraceProvider, GraceProviderProps, isDevicesState } from './components/provider';
import { useGrace } from './hooks/use-grace';
import { DevicesState, initialGlobalState, Orientation, WindowState } from './stores';
import { keys } from './utils';

const Label: FunctionComponent<{ value: string; size: 'sm' | 'md' | 'lg' }> = (props) => {
  const { size, value } = props;
  switch (size) {
    case 'sm':
      return (
        <span
          style={{
            display: 'inline-block',
            width: 'fit-content',
            marginTop: '0px',
            marginBottom: '10px',
            fontSize: '15px',
            color: '#D869A4'
          }}
        >
          {value}
        </span>
      );
    case 'md':
      return (
        <span
          style={{
            display: 'inline-block',
            width: 'fit-content',
            marginTop: '0px',
            marginBottom: '10px',
            fontSize: '17.5px',
            color: '#D8628F',
            fontWeight: 'bold'
          }}
        >
          {value}
        </span>
      );
    case 'lg':
      return (
        <span
          style={{
            display: 'inline-block',
            width: 'fit-content',
            marginTop: '0px',
            marginBottom: '10px',
            fontSize: '20px',
            color: '#D869A4',
            fontWeight: 'bolder'
          }}
        >
          {value}
        </span>
      );
  }
};

const SelectDevices = (props: { devices: DevicesState; setDevices: (devices: DevicesState) => void }) => {
  const { devices: oldDevices, setDevices: setOldDevices } = props;

  const [device, setDevice] = useState('_');
  const [devices, setDevices] = useState(oldDevices);

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
      const newDevices = cloneDeep(devices);
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
      styles={{
        clearIndicator: () => ({
          display: 'none'
        }),
        input: (provided) => ({
          ...provided,
          color: '#D869A4'
        }),
        control: (provided) => ({
          ...provided,
          boxShadow: 'none',
          border: '1px solid #D869A4',
          ':hover': {
            border: '1px solid #D869A4'
          },
          ':focus': {
            border: '1px solid #D869A4'
          },
          ':active': {
            border: '1px solid #D869A4'
          }
        }),
        container: (provided) => ({
          ...provided,
          boxShadow: 'none',
          ':focus': {
            outlineColor: '#D869A4'
          }
        }),
        multiValue: (provided) => ({
          ...provided,
          background: 'white'
        }),
        multiValueLabel: (provided, state) => {
          const isRemovable = !['mobile', 'tablet', 'desktop', 'unknown'].includes(state.getValue()[state.index].value);
          return {
            ...provided,
            color: '#D869A4',
            border: '1px solid #D869A4',
            borderTopRightRadius: isRemovable ? '0px' : 'inherit',
            borderBottomRightRadius: isRemovable ? '0px' : 'inherit',
            borderRight: isRemovable ? 'none' : '1px solid #D869A4',
            paddingRight: isRemovable ? '0px' : '6px',
            outlineColor: 'pink',
            background: 'rgba(228, 139, 170, 0.2)'
          };
        },
        multiValueRemove: (provided, state) => {
          const isRemovable = !['mobile', 'tablet', 'desktop', 'unknown'].includes(state.getValue()[state.index].value);
          return {
            ...provided,
            display: isRemovable ? 'inherit' : 'none',
            color: '#D869A4',
            border: '1px solid #D869A4',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderLeft: 'none',
            outlineColor: 'pink',
            background: 'rgba(228, 139, 170, 0.2)',
            ':hover': {
              color: 'white',
              background: 'rgba(228, 139, 170, 0.8)'
            }
          };
        },
        option: (provided, state) => ({
          ...provided,
          color: '#D869A4',
          backgroundColor: state.isDisabled
            ? 'none'
            : state.isSelected
            ? 'rgba(228, 139, 170, 1)'
            : state.isFocused
            ? 'rgba(228, 139, 170, 0.2)'
            : 'none',
          ':hover': {
            backgroundColor: 'rgba(228, 139, 170, 0.2)'
          },
          ':active': {
            backgroundColor: 'rgba(228, 139, 170, 0.2)'
          },
          ':focus': {
            backgroundColor: 'rgba(228, 139, 170, 0.2)'
          }
        })
      }}
      onInputChange={handleInputChange}
      onChange={handleChange}
    />
  );
};

const Checkbox: FunctionComponent<{ isChecked: boolean; onClick: () => void }> = ({ isChecked, onClick }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        textAlign: 'center',
        verticalAlign: 'text-bottom',
        minWidth: '15px',
        minHeight: '15px',
        color: 'white',
        background: isChecked ? '#D869A4' : 'white',
        borderRadius: '5px',
        fontSize: '12px',
        border: '1px solid #D869A4',
        marginLeft: '5px',
        marginRight: '5px'
      }}
      onClick={onClick}
    >
      {isChecked ? '✔' : ' '}
    </div>
  );
};

const CheckDevices = (props: { devices: DevicesState; setDevices: (devices: DevicesState) => void }) => {
  const { devices, setDevices } = props;
  return (
    <div style={{ paddingTop: '9px' }}>
      {keys(devices).map((device) => {
        return (
          <span key={device}>
            <span style={{ color: '#D869A4' }}>{device}</span>
            <Checkbox
              isChecked={devices[device]}
              onClick={() => {
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
    </div>
  );
};

const SelectWindowSize = (props: { windowSize: string; setWindowSize: (windowSize: string) => void }) => {
  const { windowSize, setWindowSize } = props;
  const handleWindowSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWindowSize(event.target.value);
  };
  return (
    <input
      style={{ color: '#D869A4', borderRadius: '5px', border: '1px solid #D869A4', padding: '10px', outline: 'none' }}
      value={windowSize}
      onChange={handleWindowSizeChange}
    />
  );
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
      styles={{
        clearIndicator: () => ({
          display: 'none'
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#D869A4'
        }),
        input: (provided) => ({
          ...provided,
          color: '#D869A4'
        }),
        control: (provided) => ({
          ...provided,
          color: '#D869A4',
          boxShadow: 'none',
          border: '1px solid #D869A4',
          ':hover': {
            border: '1px solid #D869A4'
          },
          ':focus': {
            border: '1px solid #D869A4'
          },
          ':active': {
            border: '1px solid #D869A4'
          }
        }),
        container: (provided) => ({
          ...provided,
          boxShadow: 'none',
          ':focus': {
            outlineColor: '#D869A4'
          }
        }),
        option: (provided, state) => ({
          ...provided,
          color: '#D869A4',
          backgroundColor: state.isDisabled
            ? 'none'
            : state.isSelected
            ? 'none'
            : state.isFocused
            ? 'rgba(228, 139, 170, 0.2)'
            : 'none',
          ':hover': {
            backgroundColor: 'rgba(228, 139, 170, 0.2)'
          },
          ':active': {
            backgroundColor: 'rgba(228, 139, 170, 0.2)'
          },
          ':focus': {
            backgroundColor: 'rgba(228, 139, 170, 0.2)'
          }
        })
      }}
      onChange={handleOrientationChange}
    />
  );
};

const CloseButton: FunctionComponent<{ onClose: () => void }> = ({ onClose }) => (
  <button
    style={{ color: '#D869A4', float: 'right', border: 'none', background: 'none', fontSize: '20px' }}
    onClick={onClose}
  >
    ✘
  </button>
);

const SettingsButton: FunctionComponent<{ isOpen: boolean; onOpen: () => void }> = ({ isOpen, onOpen }) => (
  <button
    style={{
      position: 'absolute',
      right: '20px',
      top: '20px',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px',
      border: '1px solid #D869A4',
      padding: '5px',
      outlineColor: 'pink',
      background: 'rgba(228, 139, 170, 0.2)',
      color: '#D869A4',
      borderRadius: '5px',
      display: isOpen ? 'none' : 'block'
    }}
    onClick={onOpen}
  >
    Grace Settings
  </button>
);

const GraceSubscriber: FunctionComponent<{ setWindow: (window: WindowState) => void }> = (props) => {
  const { children, setWindow } = props;

  const { window } = useGrace();

  useEffect(() => {
    setWindow(window);
  }, [window]);

  return <>{children}</>;
};

const GraceOptions: FunctionComponent<GraceProviderProps> = (props) => {
  const { window: providedWindow, devices: providedDevices, breakpoints, scope, children } = props;

  const [showModal, setShowModal] = useState(false);
  const [window, setWindow] = useState<WindowState>(providedWindow ? providedWindow : initialGlobalState.window);
  const [width, setWidth] = useState(window && window.width ? window.width : '1024px');
  const [height, setHeight] = useState(window && window.height ? window.height : '768px');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape' | Orientation>(
    window && window.orientation ? window.orientation : Orientation.Portait
  );
  const [devices, setDevices] = useState<DevicesState>(
    providedDevices && isDevicesState(providedDevices) ? providedDevices : initialGlobalState.devices
  );
  const [controlWindow, setControlWindow] = useState(false);

  const graceProviderProps: GraceProviderProps = {
    scope,
    devices,
    breakpoints,
    window: controlWindow
      ? {
          width,
          height,
          orientation
        }
      : undefined
  };

  return (
    <>
      <SettingsButton isOpen={showModal} onOpen={() => setShowModal(true)} />
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
          border: '1px solid #D869A4',
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
          <CloseButton onClose={() => setShowModal(false)} />
          <Label size="lg" value="Grace Settings" />
          <div style={{ width: '100%', display: 'grid' }}>
            <Label size="md" value="Devices" />
            <div>
              <div
                style={{
                  width: 'calc(50% - 6px)',
                  display: 'grid',
                  float: 'left',
                  marginRight: '12px',
                  paddingBottom: '10px'
                }}
              >
                <Label size="sm" value="Devices" />
                <SelectDevices devices={devices} setDevices={setDevices} />
              </div>
              <div
                style={{
                  width: 'calc(50% - 6px)',
                  float: 'left',
                  paddingBottom: '10px'
                }}
              >
                <Label size="sm" value="Current Devices" />
                <CheckDevices devices={devices} setDevices={setDevices} />
              </div>
            </div>
          </div>
          <div style={{ width: '100%', display: 'grid' }}>
            <div>
              <Label size="md" value="Window" />{' '}
              <span style={{ color: '#D869A4' }}>
                ( control:
                <Checkbox isChecked={controlWindow} onClick={() => setControlWindow(!controlWindow)} />)
              </span>
            </div>
            <div style={{ width: '100%' }}>
              <div
                style={{
                  width: 'calc(33.33% - 8px)',
                  display: 'grid',
                  float: 'left',
                  marginRight: '12px'
                }}
              >
                <Label size="sm" value="Width" />
                <SelectWindowSize windowSize={controlWindow ? width : window.width} setWindowSize={setWidth} />
              </div>
              <div
                style={{
                  width: 'calc(33.33% - 8px)',
                  display: 'grid',
                  float: 'left',
                  marginRight: '12px'
                }}
              >
                <Label size="sm" value="Height" />
                <SelectWindowSize windowSize={controlWindow ? height : window.height} setWindowSize={setHeight} />
              </div>
              <div
                style={{
                  width: 'calc(33.33% - 8px)',
                  display: 'grid',
                  float: 'left'
                }}
              >
                <Label size="sm" value="Orientation" />
                <SelectOrientation setOrientation={setOrientation} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GraceProvider {...graceProviderProps}>
        <GraceSubscriber
          setWindow={
            controlWindow
              ? (window: WindowState) => {
                  window;
                }
              : setWindow
          }
        >
          {children}
        </GraceSubscriber>
      </GraceProvider>
    </>
  );
};

/* eslint-disable react/display-name */
export const withGraceSettings = (props?: GraceProviderProps) => (story: () => JSX.Element): JSX.Element => (
  <GraceOptions {...props}>{story()}</GraceOptions>
);
