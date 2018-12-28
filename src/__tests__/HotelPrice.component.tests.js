import React from "react";
import {mount, shallow} from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HotelPrice from "../components/HotelPrice";

Enzyme.configure({ adapter: new Adapter() });
describe("<HotelPrice />", function () {
  const props = {
    price: {
      single: 100,
      double: 200
    }
  };

  it('should render hotel card', function () {
    const wrapper = mount(<HotelPrice {...props} />);
    expect(wrapper.find('#hotel-price').childAt(0).text()).toEqual('AccommodationPriceSingle$100Double$200Twin$')
  });

});

