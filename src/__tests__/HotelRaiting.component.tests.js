import React from "react";
import {mount, shallow} from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HotelRaiting from "../components/HotelRaiting";

Enzyme.configure({ adapter: new Adapter() });
describe("<HotelRaiting />", function () {
  const props = {
    rate: 4
  };

  it('should render hotel card', function () {
    const wrapper = mount(<HotelRaiting {...props} />);
    expect(wrapper.find('.star-ratings').childAt(0).text()).toEqual('')
  });

});
