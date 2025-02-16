import { debounce } from '../src/utils/debounce';

jest.useFakeTimers();

describe('debounce', () => {
  it('calls the callback after the specified wait time', async () => {
    const callback = jest.fn().mockResolvedValue('result');
    const debounced = debounce(callback, 1000);

    debounced('test');
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000);
    await Promise.resolve();
    expect(callback).toHaveBeenCalledWith('test');
  });

  it('resets the timer when calling again during the preset waiting time', async () => {
    const callback = jest.fn().mockResolvedValue('result');
    const debounced = debounce(callback, 1000);

    debounced('first');
    jest.advanceTimersByTime(500);
    debounced('second');

    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);
    await Promise.resolve();
    expect(callback).toHaveBeenCalledWith('second');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('returns a promise that resolves with the callback result', async () => {
    const callback = jest.fn().mockResolvedValue('success');
    const debounced = debounce(callback, 1000);

    const promise = debounced('test');
    jest.advanceTimersByTime(1000);
    await expect(promise).resolves.toBe('success');
  });
});
