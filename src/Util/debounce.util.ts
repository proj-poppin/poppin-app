/**
 * 인자로 받은 함수를 일정 시간 내에 호출되지 않도록 설정합니다.
 * @example
 * ```
 * const func = debounce(async (args?: any) => {
 *  const result = await axiosCall();
 *  ...
 * }, 500)
 *
 * func(args);
 * ```
 * @author 도형
 */
export function debounce(func: (...args: any) => Promise<void>, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      await func(...args);
    }, delay);
  };
}
