import { useEffect, useRef, useState } from '@lynx-js/react';
import type { NodesRef } from '@lynx-js/types';
import './styles.scss';
import { assets } from '../../assets/index.js';
import { idGenerator } from '../../utils/id-generator.js';

interface Todo {
  id: string;
  done: boolean;
  text: string;
}

interface TodoItemProps {
  todo: Todo;
  isLastOne: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

const initialTodos = [
  { id: idGenerator(), done: true, text: 'Take out the trash' },
  { id: idGenerator(), done: true, text: 'Make breakfast' },
  { id: idGenerator(), done: true, text: 'Wash the dishes' },
  { id: idGenerator(), done: false, text: 'Work the first half of the day' },
  { id: idGenerator(), done: false, text: 'Go to the Gym' },
];

export function TodosTemplate() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (todo: Todo) => {
    setTodos((list) =>
      list.map((item) =>
        item === todo ? { ...item, done: !item.done } : item,
      ),
    );
  };

  const handleDelete = (todo: Todo) => {
    setTodos((list) => list.filter((item) => item !== todo));
  };

  const handleInput = (e: {
    detail: {
      value: string;
    };
  }) => {
    setInputValue(e.detail.value);
  };

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;
    setTodos((todos: Todo[]) => [
      ...todos,
      { id: idGenerator(), done: false, text: inputValue },
    ]);
    setInputValue('');
  };

  return (
    <view className="app" id="app">
      <view className="header">
        <text className="header__title">Todos</text>
      </view>
      <scroll-view className="list" scroll-orientation="vertical">
        {todos.map((todo, index) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleChange}
              onDelete={handleDelete}
              isLastOne={todo === todos[todos.length - 1]}
            />
          );
        })}
        {todos.length === 0 && (
          <view
            style={{
              display: todos.length === 0 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
              height: '100%',
            }}
          >
            <text className="empty-list">No todos</text>
          </view>
        )}
      </scroll-view>
      <view className="item addTodo">
        <view className="col">
          <text>Write your new todo</text>
          <input
            value={inputValue}
            bottom-inset={'28px'}
            placeholder={'Add a todo here'}
            className="item__content addTodo__input"
            bindinput={handleInput}
          />
        </view>
        <text className="btn" bindtap={handleAddTodo}>
          ADD
        </text>
      </view>
    </view>
  );
}

function TodoItem({ todo, isLastOne, onToggle, onDelete }: TodoItemProps) {
  const ref = useRef<NodesRef>(null);

  useEffect(() => {
    // always scroll the last one into view.
    if (isLastOne) {
      ref.current
        ?.invoke({
          method: 'scrollIntoView',
          params: {
            scrollIntoViewOptions: {
              behavior: 'smooth',
              block: 'center',
              inline: 'start',
            },
          },
        })
        .exec();
    }
  }, [isLastOne]);

  return (
    <view className="item" ref={ref}>
      <view className="button-light" bindtap={(e) => onToggle(todo)}>
        {todo.done && <image src={assets.todosIcon} className="image" />}
      </view>
      <text className="item__content">{todo.text}</text>
      <view className="button-light" bindtap={(e) => onDelete(todo)}>
        <image src={assets.trashIcon} className="image" />
      </view>
    </view>
  );
}
