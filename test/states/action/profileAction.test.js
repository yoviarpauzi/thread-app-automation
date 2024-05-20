import {describe, expect, it, vi} from 'vitest';
import * as api from '../../../src/utils/network-data';
import {
  asyncProfile,
  profileActionCreator,
} from '../../../src/states/actions/profileAction';
import {hideLoading, showLoading} from 'react-redux-loading-bar';

const responseSuccess = {
  data: {
    users: {
      id: 'user-1',
      name: 'user',
      email: 'user@gmail.com',
      avatar: 'user-avatar',
    },
  },
  message: 'success retrieve data',
  status: 'success',
};

const responseFailed = {
  data: {
    users: {},
  },
  message: 'failed retrieve data',
  status: 'fail',
};

/**
 * test scenario for asyncProfile Thunk
 *
 * - asyncProfile Thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 */
describe('asyncProfile Thunk', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    vi.spyOn(api, 'getProfile').mockResolvedValue(responseSuccess);
    const dispatch = vi.fn();

    // action
    await asyncProfile()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
        profileActionCreator(responseSuccess),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    vi.spyOn(api, 'getProfile').mockResolvedValue(responseFailed);
    const dispatch = vi.fn();

    // action
    await asyncProfile()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(profileActionCreator(responseFailed));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
