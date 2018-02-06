import React, { Component, createContext } from 'react';

// React 16.3

// create store similar to Redux
const ApplicationContext = createContext();

const { Provider, Consumer } = ApplicationContext;

const initialState = {
  users: ['Theo', 'Rick', 'James', 'Jimmy']
};




class App extends Component {
  render() {
    return (
      <Provider value={initialState}>
        <Header />
        <Footer />
      </Provider>
    );
  }
}

const withConsumer = BaseComponent => {
  return class extends Component {
    static displayName = `withConsumer${BaseComponent.displayName}`;

    // makes use of render props
    render() {
      return (
        <Consumer>
          {context => {
            return (
                <BaseComponent {...context} {...this.props} {...this.state} />
            )
          }
        }       
        </Consumer>
      )
    }

  }
}


const componentFromUI = (ui, name) => {
  return class extends Component {

    static displayName = name;

    render() {
      console.log(55, this.props.users);
      return (
        <div>
          {ui(this.props.users)}
        </div>
      )
    }


  }
}

const Header = withConsumer(componentFromUI((users) => {
  return (
    <header>{JSON.stringify(users)} I am the header</header>
  )
}, 'Header'));
const Footer = withConsumer(componentFromUI((users) => {
  return (
    <footer>{JSON.stringify(users)} I am the header</footer>
  )
}, 'Footer'));



export default App;
