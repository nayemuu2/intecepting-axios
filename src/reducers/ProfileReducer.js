import { actions } from '../actions/actions';

const initialState = {
  profile: null,
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case actions.profile.INITIATE_DATA: {
      return {
        ...state,
        profile: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export { initialState, profileReducer };
