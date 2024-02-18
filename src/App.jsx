import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.

const App = () => {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [contents, setContents] = useState("");

  //조회 함수
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:4001/todos");
    // yarn json-server --watch db.json --port 4001
    console.log("data", data);
    setTodos(data);
  };

  // 추가 함수
  const onSubmitHandler = async () => {
    await axios.post("http://localhost:4001/todos", inputValue);

    fetchTodos();
  };

  // 삭제 함수
  const onClickDeleteButtonHandler = async (id) => {
    await axios.delete(`http://localhost:4001/todos/${id}`);
    setTodos(
      todos.filter((item) => {
        return item.id !== todos.id;
      })
    );
  };

  // 수정 함수
  const onUpdateButtonClickHandler = async () => {
    await axios.patch(`http://localhost:4001/todos/${targetId}`, {
      title: contents,
    });

    setTodos(
      todos.map((item) => {
        if (item.id === targetId) {
          return { ...item, title: contents };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <div>
        {/* 수정 영역 */}
        <input
          type="text"
          placeholder="아이디 수정"
          value={targetId}
          onChange={(e) => {
            setTargetId(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="내용 수정"
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button onClick={onUpdateButtonClickHandler}>수정</button>
        <br />
        <br />
      </div>
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
            &nbsp;
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(item.id)}
            >
              삭제
            </button>
          </div>
        );
      })}
    </>
  );
};

export default App;
