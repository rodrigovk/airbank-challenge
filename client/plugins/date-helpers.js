function stringToYearMonth(yearMonth) {
  const year = yearMonth.slice(0, 4)
  const month = yearMonth.slice(5)
  return { year, month }
}

export function getFirstDayMonth(year, month) {
  return new Date(year, month, 1)
}

export function getFirstDayMonthWithString(yearMonth) {
  const { year, month } = stringToYearMonth(yearMonth)
  return getFirstDayMonth(year, month - 1)
}

export function getLastDayMonth(year, month) {
  return new Date(year, month + 1, 0)
}

export function getLastDayMonthWithString(yearMonth) {
  const { year, month } = stringToYearMonth(yearMonth)
  return getLastDayMonth(year, month - 1)
}

export function addDay(date, days) {
  return date + days
}

export function formatDateTimeForInputs(dateTime) {
  return dateTime.split('.')[0]
}