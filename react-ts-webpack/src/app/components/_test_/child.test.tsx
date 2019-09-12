import * as React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Child from '../Child';


const mockStore = configureMockStore();
const store = mockStore({sampleReducer:1});


  beforeEach(() => { // Runs before each test in the suite
    console.log("before each");
    store.clearActions();
  });


const internalProps ={
  punt : jest.fn((id?:string) => store.dispatch({type:'TTT', id})),
  result:'yyyy'
};



test('it works', () => {
  const wrapper = mount(
      <Provider store={store}>
        <Child x="xxxx" {...internalProps}/>
      </Provider>
  );
  wrapper.find('#dave').simulate('click');
  expect(store.getActions()).toEqual([{type:'X', id:'kk'}]);
  expect(store.getState()).toEqual({sampleReducer:1});

  // test something
});
