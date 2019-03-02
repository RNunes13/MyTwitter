
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRouter } from './Routes';
import './App.scss';

interface AppProps {
}

const App: React.FunctionComponent<AppProps> = (props) => {
  return (
    <Router>
      <MainRouter />
    </Router>
  );
};

export default App;
