import * as React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { getTester, Sequence, PageModel, Enhancer } from 'redux-integration-testing';
import configureStore from '../../configureStore';
import TestWrapper from '../../hoc/test-hoc';
import {Child} from '~/app/components/Child';



const mockStore = configureMockStore();
const store = mockStore({sampleReducer:1});
const realStore = configureStore();

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
       const TestChild= TestWrapper(()=> (<Child x="iii"/>), realStore);
       const wrapper = mount(
           <TestChild/>
       );
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



