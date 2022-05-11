import { useEffect, useState } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

import { useReducer } from 'react';

const initialState = { count: 0, color: colors.yellow };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return {
        count: state.count + 1,
        color: state.color,
      };
    case 'DECREMENT_COUNT':
      return {
        count: state.count - 1,
        color: state.color,
      };
    case 'RESET_COUNT':
      return {
        count: (state.count = 0),
        color: state.color,
      };
    case 'CHANGE_COLOR':
      return {
        count: state.count,
        color: action.payload.color,
      };
    default:
      throw new Error(`Action type ${action.type} is not supported`);
  }
};

export default function Counter() {
  //const [count, setCount] = useState(0);
  //const [currentColor, setCurrentColor] = useState(colors.yellow);

  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.color);

  useEffect(() => {
    if (state.count === 0) {
      dispatch({
        type: 'CHANGE_COLOR',
        payload: { color: colors.yellow },
      });
    }

    if (state.count > 0) {
      console.log('if', state.color);
      dispatch({
        type: 'CHANGE_COLOR',
        payload: { color: colors.green },
      });
    }

    if (state.count < 0) {
      dispatch({
        type: 'CHANGE_COLOR',
        payload: { color: colors.red },
      });
    }
  }, [state.count]);

  //const increment = () => {
  //  setCount((prevState) => prevState + 1);
  //};

  //const decrement = () => {
  //  setCount((prevState) => prevState - 1);
  //};

  //const reset = () => {
  //  setCount(0);
  //};

  return (
    <main className={styles.main}>
      <h1 style={{ color: state.color }}>{state.count}</h1>
      <div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'INCREMENT_COUNT' })}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'DECREMENT_COUNT' })}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={() =>
            dispatch({
              type: 'RESET_COUNT',
            })
          }
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
