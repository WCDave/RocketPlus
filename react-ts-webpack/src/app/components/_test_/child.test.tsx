import { AgCheckbox } from 'ag-grid-community';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Enhancer, getTester, PageModel, Sequence } from 'redux-integration-testing';
import configureMockStore from 'redux-mock-store';
import { Child } from '~/app/child';
import { configureStore } from '~/app/configureStore';
import { testWrapper } from '~/app/hoc/test-hoc';


const mockStore = configureMockStore();
const mockStore1 = mockStore({ sampleReducer:1 });
const realStore = configureStore();

const setup = ({ propOverrides, store }: { propOverrides?: any, store: any }) => {
    const props = Object.assign({
        completedCount: 0,
        activeCount: 0,
        onClearCompleted: jest.fn(),
        onShow: jest.fn()
    }, propOverrides);
  // tslint:disable-next-line:variable-name
    const TestChild= testWrapper(()=> (<Child x="iii" />), store);
    const wrapper = mount(
        <TestChild />
    );


    return {
        props,
        wrapper,
        count: wrapper.find('.todo-count'),
        filters: wrapper.find('.filters'),
        clear: wrapper.find('.clear-completed'),
    };
};

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
       const { wrapper } =   setup({ propOverrides: undefined, store: realStore });
       // tslint:disable-next-line:variable-name
       const TestChild= testWrapper(()=> (<Child x="iii" />), realStore);
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
       expect(realStore.getState().result).toEqual('kk');
       console.log(realStore.getState());
     });
});



