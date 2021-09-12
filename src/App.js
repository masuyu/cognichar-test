import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Text from './Components/Atoms/Text.js';

const App = () => {
  const [ questionList, setQuestionList ] = useState([])

  useEffect(() => {
    axios
        .get('https://8rk7n1eqo3.execute-api.ap-northeast-1.amazonaws.com/dev/cognichar-questions')
        .then(response => {
            setQuestionList(response.data)
        })
  }, [])

  return (
    <div className="App">
      <Text text="Sample" />
    </div>
  );
}

export default App;
