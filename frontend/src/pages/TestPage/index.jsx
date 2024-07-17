import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

const TestPage = () => {
  registerServiceWorker();
  return (
    <div>
      <App />
    </div>
  );
};
export default TestPage;
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
