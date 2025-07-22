import { useDispatch } from "react-redux";
import type {CounterId, DecrementAction, IncrementAction} from "./store.ts";
import {counterSelector, useAppSelector} from "./store.ts";

export const Counter = ({counterId}: {counterId: CounterId}) => {
  const dispatch = useDispatch();
  const counterState = useAppSelector((state) => counterSelector(state, counterId))

  return (
    <div>
      <div
        onClick={() => {
          dispatch({type: "decrement", payload: {counterId}} satisfies DecrementAction)
        }}
      >dec</div>

      <div>{counterState?.counter || 0}</div>

      <div
        onClick={() => {
          dispatch({type: "increment", payload: {counterId}} satisfies IncrementAction)
        }}
      >inc</div>
    </div>
  );
};
