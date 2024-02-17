import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.

const App = () => {
  const [todos, setTodos] = useState(null);

  // axios를 통해서 get 요청을 하는 함수를 생성
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:4001/todos");
    console.log("data", data);
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };

  // 생성한 함수를 컴포넌트가 mount 됐을 떄 실행하기 위해 useEffect를 사용
  useEffect(() => {
    // effect 구문에 생성한 함수를 넣어 실행
    fetchTodos();
  }, []);

  return (
    <div>
      {todos?.map((item) => {
        return (
          <div key={item.id}>
            {item.id} : {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default App;
