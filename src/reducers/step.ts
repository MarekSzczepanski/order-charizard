import { CHANGE_STEP } from '../actionTypes';

interface IActionChangeStep {
  type: 'CHANGE_STEP';
  payload: number;
}

type Action = IActionChangeStep;

interface State {
  value: number;
}

const initialState: State = {
  value: 0,
};

const step = (
  state: State = initialState,
  action: Action = { type: 'CHANGE_STEP', payload: 0 },
) => {
  switch (action.type) {
    case CHANGE_STEP:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};

export default step;
