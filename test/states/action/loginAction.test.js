import {describe, expect, it, vi} from 'vitest';
import * as api from '../../../src/utils/network-data';
import {
  asyncLogin,
  loginActionCreator,
} from '../../../src/states/actions/loginAction';
import {hideLoading, showLoading} from 'react-redux-loading-bar';

const successResponse = {
  data: {
    token: '2342353234',
  },
  message: 'success login',
  status: 'success',
};

const failedResponse = {
  data: {
    token: '',
  },
  message: 'failed login',
  status: 'fail',
};

/**
 * test scenario for asyncLogin Thunk
 *
 * - asyncLogin Thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 */
describe('asyncLogin Thunk', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const userCredential = {
      email: 'user@gmail.com',
      password: 'pass',
    };
    vi.spyOn(api, 'login').mockResolvedValue(successResponse);
    const dispatch = vi.fn();

    // action
    await asyncLogin(userCredential)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(loginActionCreator(successResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    const userCredential = {
      email: 'user@gmail.com',
      password: 'wrongpassword',
    };
    vi.spyOn(api, 'login').mockRejectedValue(failedResponse);
    const dispatch = vi.fn();

    // action
    await asyncLogin(userCredential)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(loginActionCreator(failedResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
