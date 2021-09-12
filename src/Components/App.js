import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.js';

const App = () => {
  return (
    <>
      <div className="App">
        <div className="px-80 bg-green-300">
          <Header text='認知特性テスト' />
        </div>
      </div>
    </>
  );
}

export default App;
