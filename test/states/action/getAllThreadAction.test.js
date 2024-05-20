import {describe, expect, it, vi} from 'vitest';
import * as api from '../../../src/utils/network-data';
import {
  asyncGetAllThread,
  getAllThreadActionCreator,
} from '../../../src/states/actions/getAllThreadAction';
import {hideLoading, showLoading} from 'react-redux-loading-bar';

const responseSuccess = {
  data: {
    threads: [
      {
        threadId: 'thread-1',
      },
      {
        threadId: 'thread-2',
      },
    ],
  },
  status: 'success',
  message: 'success retrieve data',
};

const responseFailed = {
  data: {
    threads: [],
  },
  status: 'fail',
  message: 'failed retrieve data',
};

/**
 * test scenario for asyncGetAllThread Thunk
 *
 * - asyncGetAllThread Thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 */
describe('asyncGetAllThread Thunk', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    vi.spyOn(api, 'getAllThread').mockResolvedValue(responseSuccess);
    const dispatch = vi.fn();

    // action
    await asyncGetAllThread()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
        getAllThreadActionCreator(responseSuccess),
    );
    expect(dispatch).toHaveBeenCalled(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    vi.spyOn(api, 'getAllThread').mockRejectedValue(responseFailed);
    const dispatch = vi.fn();

    // action
    await asyncGetAllThread()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
        getAllThreadActionCreator(responseFailed),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
