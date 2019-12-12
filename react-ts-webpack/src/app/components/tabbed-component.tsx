import { Form, Formik, FormikProps } from 'formik';
import * as lodash from 'lodash';
import { Moment,  } from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Dispatch } from 'redux';
import * as Yup from 'yup';
import '../App.css';
import AgGridPanel from './agGridPanel';
import Hello from './hello';
import { TestComponent } from './test-component';



interface InitValues {
  email: string;
  password: string;
  chk: boolean;
  aDate: Moment;
  bDate?: any;
  testText: string;
  selectTest: any;
  fa: any[];
  fa2: any[];
  subType: string;
}

class TabbedComponent extends React.Component<any, any, any> {
  // Hoc = hoc(TestComponent);
  selectedTab = 0;
  validationSchema: any = Yup.object().shape({
    email: Yup.string()
      .email('oops email')
      .required('required field'),
    password: Yup.string().required('required field'),
    aDate: Yup.date().required('required field'),
    bDate: Yup.date().required('required field'),
    testText: Yup.string()
      .min(1, 'required field')
      .required('required field'),
    selectTest: Yup.object().test('llll', 'Invalid value', obj => {
      return obj && obj.value === 'a';
    }),
    fa: Yup.array().min(1, 'Need one element'),
    fa2: Yup.array().of(
      Yup.object().shape({
        make: Yup.string(),
        model: Yup.string().when(
          ['make'],
          (make: string, schema: Yup.Schema<string>) => {
            console.log(make);
            if (make === 'Toyota') {
              return Yup.string().test('model-match', 'bad model', value => {
                return value === 'Celica';
              });
            }

            return Yup.string().required('OOOO');
          }
        ),
        price: Yup.number().typeError('wrong type')
      })
    )
  });

  variableMap = new Map();

  selectOptions: any[] = [
    { value: 'a', label: 'a' },
    { value: 'b', label: 'b' },
    { value: 'c', label: 'c' }
  ];

  rowData: any[] = [
    { make: 'Toyota', model: 'Celica', price: 35000, x: true },
    { make: 'Ford', model: 'Mondeo', price: 32000, x: false },
    { make: 'Porsche', model: 'Boxter', price: 72000, x: false }
  ];

  initialValue: InitValues = {
    email: 'qqq',
    password: '',
    chk: false,
    aDate: moment(),
    bDate: null,
    testText: '',
    selectTest: undefined,
    fa: this.selectOptions,
    fa2: this.rowData,
    subType: ''
  };

  constructor(props: any) {
    super(props);
    this.state = { tabIndex: this.selectedTab };
    this.variableMap.set('email', 0);
    this.variableMap.set('password', 0);
    this.variableMap.set('chk', 0);
    this.variableMap.set('aDate', 0);
    this.variableMap.set('aDate', 0);
    this.variableMap.set('bDate', 0);
    this.variableMap.set('testText', 1);
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.selectedTab !== this.state.tabIndex) {
      this.setState({ tabIndex: this.selectedTab });
    }
  }

  render() {
    const resultStr = this.props.result
      ? JSON.stringify(this.props.result, null, 2)
      : '';
    let _tabOneClass = 'react-tabs__tab';
    let _tabTwoClass = _tabOneClass;
    const XChild = this.props.child;
    return (
      <div>
        {resultStr}
        {this.props.children}
        {/*<XChild {...this.props}/>*/}
        <Formik
          initialValues={{
            email: 'qqq',
            password: '',
            chk: false,
            aDate: moment(),
            bDate: undefined,
            testText: '',
            selectTest: undefined,
            fa: this.selectOptions,
            fa2: this.rowData,
            subType: ''
          }}
          validationSchema={this.validationSchema}
          onSubmit={(values, actions) => {
            const yy = 0;
            const hh = 0;
            setTimeout(() => {
              alert(JSON.stringify(values.fa2, null, 2));
              actions.setSubmitting(false);
              this.props.punt(values.password);
              console.log(values.subType, this.props.xxx);
              this.setState({
                email: values.email,
                password: values.password,
                chk: values.chk
              });
            }, 1000);
          }}
          validateOnChange={false}
        >
          {(props: FormikProps<InitValues>) => {
            this.selectedTab = this.state.tabIndex;
            if (!props.isValidating) {
              const keys = lodash.keys(props.errors);

              if (keys.length) {
                const firstErrorIdx = keys[0];
                const tab = this.variableMap.get(firstErrorIdx);

                if (
                  tab !== this.state.tabIndex &&
                  (props.touched as any)[firstErrorIdx]
                ) {
                  if (tab === 0) {
                    _tabOneClass = 'errorClass';
                  } else {
                    _tabTwoClass = 'errorClass';
                  }
                  // this.props.valError(firstErrorIdx);
                }
              }
            }

            return (
              <div>
                <Form>
                  <Tabs
                    selectedIndex={this.state.tabIndex}
                    onSelect={(tabIndex: number) => this.setState({ tabIndex })}
                  >
                    <TabList>
                      <Tab className={_tabOneClass}>Tab 1</Tab>

                      {true && <Tab className={_tabTwoClass}>Tab 2</Tab>}
                      <Tab> Tab Grid</Tab>
                    </TabList>

                    <TabPanel>
                      <Hello
                        compiler={'1'}
                        framework={'2'}
                        bundler={'3'}
                        {...props}
                      />
                    </TabPanel>

                    {true && (
                      <TabPanel>
                        <TestComponent {...props} />
                      </TabPanel>
                    )}

                    <TabPanel>
                      <AgGridPanel {...props} />
                    </TabPanel>
                  </Tabs>
                  <button
                    id="b1"
                    disabled={props.isSubmitting}
                    onClick={evt => {
                      props.setFieldValue('subType', 'b1');
                      props.submitForm();
                    }}
                  >
                    Submit1
                  </button>
                  <button
                    id="b2"
                    disabled={props.isSubmitting}
                    onClick={evt => {
                      props.setFieldValue('subType', 'b2');
                      props.submitForm();
                    }}
                  >
                    Submit2
                  </button>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state: any, props: any) => {
  return {
    result: state.delay.result,
    field: state.delay.field
  };
};

function mapDispatchToProps(dispatch: Dispatch<any>, ownProps: any): any {
  return {
    punt: (id: string) => {
      dispatch({ type: 'X', id });
    },
    valError: (field: string) => {
      dispatch({ type: 'ERROR', field });
    }
  };
}

export default connect<{}, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(TabbedComponent);
