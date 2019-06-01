import React from 'react';

import { Provider } from 'react-redux';

import ReduxGlobals from './src/Globals/Redux';
import MainApp from './src/App';

class App extends React.Component {
  render() {
    return (
      <Provider store={ ReduxGlobals.store }>
        <MainApp></MainApp>
      </Provider>
    );
  }
}
export default App;