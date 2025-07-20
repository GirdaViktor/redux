import {useEffect, useReducer} from "react";
import type {DecrementAction, IncrementAction} from "./store.ts";
import { store } from "./store.ts";

import './App.css'

function App() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      forceUpdate();
    });

    return unSubscribe;
  }, []);

  return (
    <>
      <div
        onClick={() => {
          store.dispatch({type: "decrement"} satisfies DecrementAction)
        }}
      >dec</div>

      <div>{store.getState().counter}</div>

      <div
        onClick={() => {
          store.dispatch({type: "increment"} satisfies IncrementAction)
        }}
      >inc</div>
    </>
  )
}

export default App
