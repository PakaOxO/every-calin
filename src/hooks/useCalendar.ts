const useCalendar = () => {
  /**
   * @name getThisMonth
   * @description 이번 달 모든 날짜를 반환합니다.
   *
   * @param {number} maxWeekLen 달력에 표시할 주(행)의 길이
   * @returns {Date[]}
   */
  const getThisMonth = (refDate: Date, maxWeekLen: number): Date[][] => {
    const today = new Date(refDate);
    const year = today.getFullYear();
    const month = today.getMonth();

    const thisFirstDay = new Date(year, month, 1);

    const result = [];
    let week = [];

    const currDate = new Date(thisFirstDay);
    while (currDate.getDay() > 0) {
      currDate.setDate(currDate.getDate() - 1);
      week.push(new Date(currDate));
      if (week.length === 7) {
        week.sort((a, b) => (a < b ? -1 : 1));
        result.push(week);
        week = [];
      }
      if (currDate.getDay() === 0) break;
    }

    currDate.setMonth(thisFirstDay.getMonth(), 1);

    while (result.length < maxWeekLen) {
      week.push(new Date(currDate));
      if (week.length === 7) {
        week.sort((a, b) => (a < b ? -1 : 1));
        result.push(week);
        week = [];
      }
      currDate.setDate(currDate.getDate() + 1);
    }

    console.log(result.map((line) => line.join('\n')).join('\n\n'));
    return result;
  };

  return { getThisMonth };
};

export default useCalendar;

