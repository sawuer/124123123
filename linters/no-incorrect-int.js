/**
 * Проверка `int` параметра. int в подавляющем большинстве слишком длинный и не имеет ничего общего с реальностью.
 *
 * @param {unknown} input
 *
 * @returns  {[{message: string}]}
 */
const noIncorrectInt = (input) => {
  if (input === 'int64' || input === 'int32') {
    return [
      {
        message: `Нужно заменить '${input}' на минимальное и максимальное значение вместо использования intXX.`,
      },
    ];
  }
};

export default noIncorrectInt;
