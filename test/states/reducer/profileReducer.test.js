import {describe, expect, it} from 'vitest';
import profileReducer from '../../../src/states/reducers/profileReducer';

/**
 * test scenario for profileReducer
 *
 * - loginReducer function
 *   - should return the initial state when given by unknown action
 *   - should return data when given by profile action
 *   - should return empty data when given by reset_profile action
 */
describe('profileReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {};
    const action = {
      type: 'UNKNOWN',
    };

    // action
    const nextState = profileReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return data when given by profile action', () => {
    // arrange
    const initialState = {};
    const shouldReturn = {
      data: {
        id: 'user',
        name: 'user',
        email: 'user@gmail.com',
        avatar: 'userAvatar',
      },
      message: 'success retrieve profile',
      status: 'success',
    };
    const action = {
      type: 'PROFILE',
      payload: {
        data: {
          user: {
            id: 'user',
            name: 'user',
            email: 'user@gmail.com',
            avatar: 'userAvatar',
          },
        },
        message: 'success retrieve profile',
        status: 'success',
      },
    };

    // action
    const nextState = profileReducer(initialState, action);
    expect(nextState).toEqual(shouldReturn);
  });

  it('should return empty data when given by reset_profile action', () => {
    // arrange
    const initialState = {};
    const shouldReturn = {
      data: {},
      status: '',
      message: '',
    };
    const action = {
      type: 'RESET_PROFILE',
    };

    // action
    const nextState = profileReducer(initialState, action);

    // assert
    expect(nextState).toEqual(shouldReturn);
  });
});
