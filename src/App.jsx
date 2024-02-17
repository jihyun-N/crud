import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.

const App = () => {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
  });

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:4001/todos");
    // yarn json-server --watch db.json --port 4001
    console.log("data", data);
    setTodos(data);
  };

  const onSubmitHandler = async () => {
    await axios.post("http://localhost:4001/todos", inputValue);

    setTodos([...todos, inputValue]);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <div>
        {/* INPUT 영역 */}
        <form
          onSubmit={(e) => {
            // 👇 submit했을 때 브라우저의 새로고침을 방지합니다.
            e.preventDefault();

            // 버튼 클릭시 , input에 들어있는 값(state)을 이용하여 db에 저장(post 요청)
            onSubmitHandler();
          }}
        >
          <input
            type="text"
            value={inputValue.title}
            onChange={(e) => {
              setInputValue({
                title: e.target.value,
              });
            }}
          />
          <button type="submit">추가</button>
        </form>
      </div>
      {/* 데이터 영역 */}
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
