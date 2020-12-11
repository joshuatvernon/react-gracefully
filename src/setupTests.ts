import { matchers } from '@emotion/jest';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure } from 'enzyme';

expect.extend(matchers);

configure({
  adapter: new Adapter()
});
