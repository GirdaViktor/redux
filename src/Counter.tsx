import {useEffect, useReducer} from 'react';
import type {CounterId, DecrementAction, IncrementAction} from "./store.ts";
import { store } from "./store.ts";

export const Counter = ({counterId}: {counterId: CounterId}) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unSubscribe = store.subscribe(() => {
      forceUpdate();
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

      <div>{store.getState().counters[counterId]?.counter || 0}</div>

      <div
        onClick={() => {
          store.dispatch({type: "increment", payload: {counterId}} satisfies IncrementAction)
        }}
      >inc</div>
    </div>
  );
};
