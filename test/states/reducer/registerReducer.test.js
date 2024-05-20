import {describe, expect, it} from 'vitest';
import registerReducer from '../../../src/states/reducers/registerReducer';

/**
 * test scenario for profileReducer
 *
 * - registerReducer function
 *   - should return the initial state when given by unknown action
 *   - should return data when given by register action
 *   - should return empty data when given by reset_register action
 */
describe('registerReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {};
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = registerReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return data when given by register action', () => {
    // arrange
    const initialState = {};
    const shouldReturn = {
      data: {},
      message: 'success register',
      status: 'succes',
    };
    const action = {
      type: 'REGISTER',
      payload: {
        data: {},
        message: 'success register',
        status: 'succes',
      },
    };

    // action
    const nextState = registerReducer(initialState, action);

    // assert
    expect(nextState).toEqual(shouldReturn);
  });

  it('should return empty data when given by reset_register action', () => {
    // arrange
    const initialState = {};
    const shouldReturn = {
      data: {},
      message: '',
      status: '',
    };
    const action = {
      type: 'RESET_REGISTER',
    };

    // action
    const nextState = registerReducer(initialState, action);

    // assert
    expect(nextState).toEqual(shouldReturn);
  });
});
