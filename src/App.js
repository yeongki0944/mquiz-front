import logo from './logo.svg';
import './App.css';

import Test from './components/testlist';
import Qpanel from './components/Quiz_panel';
import {useEffect, useState} from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
      setData([
          {
              key: 1,
              title: "test1",
              status: "작성중",
              qcnt: 10,
              author: "김재훈",
              date: "2021-08-01"
          },
          {
              key: 2,
              title: "test2",
              status: "사용가능",
              qcnt: 10,
              author: "김재이",
              date: "2021-08-01"
          },
      ]);
  },[]);
  return (
    <>
    {/*<Test data={data}/>*/}
        <Qpanel/>

    </>
  );
}

export default App;
