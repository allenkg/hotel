import React from "react";
import { shallow } from "enzyme";
import { createShallow } from '@material-ui/core/test-utils';

import HotelCard from "../components/HotelCard";
import HotelDetailModal from "../components/HotelDetailsModal";

describe('Should render HotelCard component', function () {
  const props = {
    isLoading: false,
    hotel: {
      name: 'Test Hotel',
      rate: 3,
      img: 'test/image',
      address: 'test hotel address'
    }
  };

  it('should render hotel card', function () {
    const wrapper = createShallow(<HotelCard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render HotelDetailModal', function () {
    const wrapper = createShallow(<HotelDetailModal />);
    expect(wrapper).toMatchSnapshot();
  });
});

