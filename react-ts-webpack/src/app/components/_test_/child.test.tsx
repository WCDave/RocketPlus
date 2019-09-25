import * as React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { getTester, Sequence, PageModel, Enhancer } from 'redux-integration-testing';
import configureStore from '~/app/configureStore';
import TestWrapper from '~/app/hoc/test-hoc';
import {Child} from "~/app/child";
import {AgCheckbox} from "ag-grid-community";


const mockStore = configureMockStore();
const store = mockStore({sampleReducer:1});
const realStore = configureStore();

const setup = ({propOverrides, store}: { propOverrides?: any, store: any }) => {
    const props = Object.assign({
        completedCount: 0,
        activeCount: 0,
        onClearCompleted: jest.fn(),
        onShow: jest.fn()
    }, propOverrides);
    const TestChild= TestWrapper(()=> (<Child x="iii"/>), store);
    const wrapper = mount(
        <TestChild/>
    );


    return {
        props,
        wrapper,
        count: wrapper.find('.todo-count'),
        filters: wrapper.find('.filters'),
        clear: wrapper.find('.clear-completed'),
    }
}

// describe('setup mock store test', ()=> {
//       beforeEach(() => { // Runs before each test in the suite
//         console.log("before each");
//         store.clearActions();
//       });
//   test('it works', () => {
//     const wrapper = mount(
//         <Provider store={store}>
//           <Child x="xxxx" />
//         </Provider>
//     );
//     const w2 = wrapper.find('#dave');
//     w2.simulate('click');
//     expect(store.getActions()).toEqual([{type:'XD', id:'kk'}]);
//     expect(store.getState()).toEqual({sampleReducer:1});
//
//     // test something
//   });
//     }
// )

describe ('real store test', ()=>{
  beforeEach(() => { // Runs before each test in the suite
    console.log(realStore.getState());
  });
     test('realstore test1', ()=> {
       const { wrapper } =   setup({propOverrides: undefined, store: realStore});
       const TestChild= TestWrapper(()=> (<Child x="iii"/>), realStore);
       // const wrapper = mount(
       //     <TestChild/>
       // );
    //    const wrapper = mount(
    //     <Provider store={realStore}>
    //       <Child x="xxxx" />
    //     </Provider>
    // );

       console.log(realStore.getState());
       const w2 = wrapper.find('#dave');
       const wf = wrapper.find('Formik');
       console.log(wf.instance().getFormikBag());
       w2.simulate('click');
       expect(realStore.getState().result).toEqual('kk')
       console.log(realStore.getState());
     })
})



