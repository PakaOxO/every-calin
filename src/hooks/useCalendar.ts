const useCalendar = () => {
  /**
   * @name getThisMonth
   * @description 이번 달 모든 날짜를 반환합니다.
   *
   * @param {number} maxWeekLen 달력에 표시할 주(행)의 길이
   * @returns {Date[]}
   */
  const getThisMonth = (refDate: Date, maxWeekLen: number): Date[] => {
    const today = new Date(refDate);
    const year = today.getFullYear();
    const month = today.getMonth();

    const thisFirstDay = new Date(year, month, 1);

    const result = [];

    const currDate = new Date(thisFirstDay);
    while (currDate.getDay() > 0) {
      currDate.setDate(currDate.getDate() - 1);
      result.push(new Date(currDate));
      if (currDate.getDay() === 0) break;
    }

    result.sort((a, b) => (a < b ? -1 : 1));

    currDate.setMonth(thisFirstDay.getMonth());
    currDate.setDate(thisFirstDay.getDate());

    while (result.length < maxWeekLen * 7) {
      result.push(new Date(currDate));
      currDate.setDate(currDate.getDate() + 1);
    }

    return result;
  };

  return { getThisMonth };
};

export default useCalendar;

