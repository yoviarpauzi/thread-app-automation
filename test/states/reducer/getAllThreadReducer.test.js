import {describe, it, expect} from 'vitest';
import getAllThreadReducer from '../../../src/states/reducers/getAllThreadReducer';

/**
 * test scenario for getAllReducer
 *
 * - getAllReducer function
 *   - should return the initial state when given by unknown action
 *   - should return data when given by get_all_thread action
 *   - should return empty data when given by reset_get_all_thread action
 */
describe('getAllReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {};
    const action = {type: 'UNKNOWN'};

    // action
    const nextState = getAllThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return data when given by get_all_thread action', () => {
    // arrange
    const initialState = {};

    const shouldReturn = {
      data: [
        {
          threadId: '23423',
        },
        {
          threadId: '234234',
        },
      ],
      status: 'success',
      message: 'success retrieve data',
    };

    const action = {
      type: 'GET_ALL_THREAD',
      payload: {
        data: {
          threads: [
            {
              threadId: '23423',
            },
            {
              threadId: '234234',
            },
          ],
        },
        status: 'success',
        message: 'success retrieve data',
      },
    };

    // action
    const nextState = getAllThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(shouldReturn);
  });

  it('should return empty data when given by reset_get_all_thread action', () => {
    // arrange
    const initialState = {};
    const shouldReturn = {
      data: [],
      status: '',
      message: '',
    };
    const action = {
      type: 'RESET_GET_ALL_THREAD',
    };

    // action
    const nextState = getAllThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(shouldReturn);
  });
});
