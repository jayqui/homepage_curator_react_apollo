const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

function dayIndex(dayOfWeek) {
  return DAYS_OF_WEEK.indexOf(dayOfWeek);
}

export function compressRecurrenceRules(recurrenceRules) {
  const result = [];
  let currentRuleObj = {
    beginDay: recurrenceRules[0] && recurrenceRules[0].dayOfWeek,
    startTime: recurrenceRules[0] && recurrenceRules[0].startTime,
    endTime: recurrenceRules[0] && recurrenceRules[0].endTime,
  };

  recurrenceRules.forEach((recurrenceRule, index) => {
    const { dayOfWeek, startTime, endTime } = recurrenceRule;

    const currentRuleObjEndDayIndex = dayIndex(currentRuleObj.endDay);
    const dayAfterCurrentRuleObjEndDay = DAYS_OF_WEEK[currentRuleObjEndDayIndex + 1];

    const shouldCompressIntoPrior =
      (!currentRuleObj.endDay || dayAfterCurrentRuleObjEndDay === dayOfWeek) &&
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

  return result;
}
