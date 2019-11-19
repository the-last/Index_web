import * as Types from "./types";

const defaultState = {
  count: 0
};

const reducer = (state, action) => {

    switch (action.type) {
        case Types.EXAMPLE_TEST: {
            return {
                ...state,
                count: action.count
            };
        }
        default: {
            return state;
        }
    }
};
export {
    defaultState,
    reducer
} 
