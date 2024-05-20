import {describe, expect, it} from 'vitest';
import loginReducer from '../../../src/states/reducers/loginReducer';

/**
 * test scenario for loginReducer
 *
 * - loginReducer function
 *   - should return the initial state when given by unknown action
 *   - should return data when given by login action
 *   - should return empty data when given by reset_login action
 */
describe('loginReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {};
    const action = {type: 'UNKNOWN'};

    // action
    const nextState = loginReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return data when given by login action', () => {
    // arrange
    const initialState = {};

    const shouldReturn = {
      data: '12345468453749',
      message: 'success login',
      status: 'success',
    };

    const action = {
      type: 'LOGIN',
      payload: {
        data: {
          token: '12345468453749',
        },
        message: 'success login',
        status: 'success',
      },
    };

    // action
    const nextState = loginReducer(initialState, action);

    // assert
    expect(nextState).toEqual(shouldReturn);
  });

  it('should return empty data when given by reset_login action', () => {
    // arrange
    const initialState = {};

    const shouldReturn = {
      data: {},
      message: '',
      status: '',
    };

    const action = {
      type: 'RESET_LOGIN',
    };

    // action
    const nextState = loginReducer(initialState, action);

    // assert
    expect(nextState).toEqual(shouldReturn);
  });
});
