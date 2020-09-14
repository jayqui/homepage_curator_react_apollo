const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function dayIndex(dayOfWeek) {
  return DAYS_OF_WEEK.indexOf(dayOfWeek);
}

export function compressRecurrenceRules(recurrenceRules) {
  const result = [];
  let currentRuleObj = {};

  recurrenceRules.forEach((recurrenceRule, index) => {
    const { dayOfWeek, startTime, endTime } = recurrenceRule;

    currentRuleObj.beginDay = currentRuleObj.beginDay || dayOfWeek;
    currentRuleObj.startTime = currentRuleObj.startTime || startTime;
    currentRuleObj.endTime = currentRuleObj.endTime || endTime;

    const currentRuleObjEndDayIndex = currentRuleObj.endDay ? dayIndex(currentRuleObj.endDay) : null;
    const dayAfterCurrentRuleObjEndDay = currentRuleObj.endDay ? DAYS_OF_WEEK[currentRuleObjEndDayIndex + 1] : null;

    const shouldCompressIntoPrior =
      (!dayAfterCurrentRuleObjEndDay || dayAfterCurrentRuleObjEndDay === dayOfWeek) &&
      currentRuleObj.startTime === startTime &&
      currentRuleObj.endTime === endTime;
    const isLastRecurrenceRule = index === recurrenceRules.length - 1;

    if (shouldCompressIntoPrior) {
      currentRuleObj.endDay = dayOfWeek;
      if (isLastRecurrenceRule) {
        result.push(currentRuleObj);
      }
    } else {
      result.push(currentRuleObj);
      currentRuleObj = {
        beginDay: dayOfWeek,
        startTime: startTime,
        endTime: endTime,
      };
    }
  });

  console.log("result: ", result);

  return result;
}
