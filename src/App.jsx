import React, {useState} from "react";
import "./styles.css";

export const App = () => {
  // Todo入力欄に入力された値をstateに保存する。保存用なので、useStateの中身は空にする。
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos,setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  // eventの引数を受け取る。event.target.valueに実際の値が入ってくるので、その値をsetTodoTextでstateに反映している。
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // input欄で追加ボタンを押すと、入力された文字が未完了のTODOに入る
  const onClickAdd = () => {
    if (todoText === "") return; // inputに何も入力されていない場合、追加できないようにする。
    const newTodos = [...incompleteTodos,todoText]; // スプレッド構文で、incompleteTodos配列にtodoTextを追加し、newTodosに代入する。
    setIncompleteTodos(newTodos); // setIncompleteTodosでuseStateを更新し、未完了のTODO一覧に追加する。
    setTodoText(""); // 追加後、入力欄に文字が残るので空白で上書きする。
  };

  // 削除をクリックすると、タスクを削除する関数
  const onClickDelete =(index) => {
    const newTodos = [...incompleteTodos];  // newTodosにincompleteTodosの中身を代入する。
    newTodos.splice(index, 1); // 配列から、indexに入っている番号の要素を1つ削除する。
    setIncompleteTodos(newTodos); // ↑で1つ削除した配列newTodosを、setIncompleteTodosにセットする。
  }

  // 完了をクリックすると完了済にタスクを移動させる。
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];  // newTodosにincompleteTodosの中身を代入する。
    newIncompleteTodos.splice(index, 1); // 配列から、indexに入っている番号の要素を1つ削除する。

    const newCompleteTodos = [...completeTodos,incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  }

  // 完了から未完了に戻す
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index,1);

    const newIncompleteTodos =[...incompleteTodos,completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  }

  return (
    <>
      <div className="input-area">
        {/* inputされたvalueをtodoTextのstateに定義している。onChangeで入力が変わるたびにstate(todoText)の内容も変えたいのでonChangetodoText関数を設定 */}
        <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText}/>
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo,index) => {
            return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
            )
          })}
        </ul>
      </div>
      <div>
        <div className="complete-area">
          <p className="title">完了のTODO</p>
          <ul>
          {completeTodos.map((todo,index) => {
            return (
            <div key={todo} className="list-row">
              <li>{todo}</li>
              <button onClick={() => onClickBack(index)}>戻す</button>
            </div>
            )
          })}
        </ul>
        </div>
      </div>
    </>
  );
};
