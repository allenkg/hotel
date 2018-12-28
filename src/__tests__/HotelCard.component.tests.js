import React from "react";
import {mount, shallow} from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import HotelCard from "../components/HotelCard";

Enzyme.configure({ adapter: new Adapter() });
describe("<HotelCard />", function () {
  const props = {
    isLoading: false,
    hotel: {
      name: 'Test Hotel',
      rate: 3,
      img: 'test/image',
      address: ' test hotel address',
      price: { single: 100, double: 200 }
    }
  };

  it('should render hotel card', function () {
    const wrapper = mount(<HotelCard {...props} />);
    expect(wrapper.find('#hotel-card').childAt(0).text()).toEqual('Test Hotel test hotel address$ 200View Deal')
  });

});

