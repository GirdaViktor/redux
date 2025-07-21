import {useEffect, useReducer, useRef} from 'react';
import type {CounterId, DecrementAction, IncrementAction} from "./store.ts";
import {counterSelector, store} from "./store.ts";

export const Counter = ({counterId}: {counterId: CounterId}) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const counterState = counterSelector(store.getState(), counterId);
  const lastStateRef = useRef<ReturnType<typeof counterSelector>>(null)

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      const lastState = lastStateRef.current;

      if (counterState !== lastState) forceUpdate();

      lastStateRef.current = counterState
    });

    return unSubscribe;
  }, []);


  return (
    <div>
      <div
        onClick={() => {
          store.dispatch({type: "decrement", payload: {counterId}} satisfies DecrementAction)
        }}
      >dec</div>

      <div>{counterState?.counter || 0}</div>

      <div
        onClick={() => {
          store.dispatch({type: "increment", payload: {counterId}} satisfies IncrementAction)
        }}
      >inc</div>
    </div>
  );
};
