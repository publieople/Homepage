import { useState, useCallback, Dispatch, SetStateAction } from 'react';

/**
 * 一个自定义Hook，用于在localStorage中管理带过期时间的状态。
 * @param key localStorage的键。
 * @param defaultValue 默认值。
 * @param ttl 缓存的生存时间（毫秒）。
 * @returns 返回一个类似useState的数组，包含当前状态和设置状态的函数。
 */
export function useCachedState<T>(
  key: string,
  defaultValue: T,
  ttl: number
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const { value, expiry } = JSON.parse(item);
        // 如果缓存未过期，则使用缓存值
        if (Date.now() < expiry) {
          return value;
        }
      }
    } catch (error) {
      console.error(`从localStorage读取缓存(key: "${key}")时出错:`, error);
    }
    // 否则使用默认值
    return defaultValue;
  });

  const setCachedState = useCallback(
    (valueOrFn: SetStateAction<T>) => {
      try {
        const newValue =
          valueOrFn instanceof Function ? valueOrFn(state) : valueOrFn;
        const item = {
          value: newValue,
          expiry: Date.now() + ttl,
        };
        window.localStorage.setItem(key, JSON.stringify(item));
        setState(newValue);
      } catch (error) {
        console.error(`写入localStorage缓存(key: "${key}")时出错:`, error);
      }
    },
    [key, ttl, state]
  );

  return [state, setCachedState];
}
