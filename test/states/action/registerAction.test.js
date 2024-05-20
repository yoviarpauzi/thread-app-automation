import {describe, expect, it, vi} from 'vitest';
import * as api from '../../../src/utils/network-data';
import {
  asyncRegister,
  registerActionCreator,
} from '../../../src/states/actions/registerAction';
import {hideLoading, showLoading} from 'react-redux-loading-bar';

const responseSuccess = {
  data: {
    user: {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
  status: 'success',
  message: 'success retrieve data',
};

const responseFailed = {
  data: {
    user: {},
  },
  status: 'fail',
  message: 'failed register',
};

/**
 * test scenario for asyncRegister Thunk
 *
 * - asyncRegister Thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 */
describe('asyncRegister Thunk', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    const userCredential = {
      name: 'user',
      email: 'user@gmail.com',
      password: 'password',
    };
    vi.spyOn(api, 'register').mockResolvedValue(responseSuccess);
    const dispatch = vi.fn();

    // action
    await asyncRegister(userCredential)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
        registerActionCreator(responseSuccess),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    const userCredential = {
      name: 'sameuser',
      email: 'sameuser@gmail.com',
      password: 'password',
    };
    vi.spyOn(api, 'register').mockRejectedValue(responseFailed);
    const dispatch = vi.fn();

    // action
    await asyncRegister(userCredential)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
        registerActionCreator(responseFailed),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
