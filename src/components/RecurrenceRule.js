import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';

const UPDATE_RECURRENCE_RULE = loader('../graphql/recurrence_rule/mutations/update_recurrence_rule.graphql');

function RecurrenceRule({ recurrenceRule }) {
  const { beginDay, endDay, startTime, endTime } = recurrenceRule;
  const [newBeginDay, setNewBeginDay] = useState(beginDay)
  const [newEndDay, setNewEndDay] = useState(endDay)

  const [startHour, startMinute, startSecond] = startTime.split(':');
  const [newStartHour, setNewStartHour] = useState(startHour)
  const [newStartMinute, setNewStartMinute] = useState(startMinute)
  const [newStartSecond, setNewStartSecond] = useState(startSecond)

  const [endHour, endMinute, endSecond] = endTime.split(':');
  const [newEndHour, setNewEndHour] = useState(endHour)
  const [newEndMinute, setNewEndMinute] = useState(endMinute)
  const [newEndSecond, setNewEndSecond] = useState(endSecond)

  const stateSetters = {
    beginDay: setNewBeginDay,
    endDay: setNewEndDay,
    startHour: setNewStartHour,
    startMinute: setNewStartMinute,
    startSecond: setNewStartSecond,
    endHour: setNewEndHour,
    endMinute: setNewEndMinute,
    endSecond: setNewEndSecond,
  }

  const [updateRecurrenceRule] = useMutation(UPDATE_RECURRENCE_RULE);

  function handleInputChange(event, inputName) {
    event.preventDefault();
    stateSetters[inputName](event.target.value);
  }

  useEffect(() => {
    updateRecurrenceRule({
      variables: {
        recurrenceRuleId: recurrenceRule.id,
        attributes: {
          beginDay: newBeginDay,
          endDay: newEndDay,
          startTime: `${newStartHour}:${newStartMinute}:${newStartSecond}`,
          endTime: `${newEndHour}:${newEndMinute}:${newEndSecond}`,
        },
      },
    })
  }, [newBeginDay, newEndDay, newEndHour, newEndMinute, newEndSecond, newStartHour, newStartMinute, newStartSecond, recurrenceRule.id, updateRecurrenceRule])

  const ALL_DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const ALL_HOUR_OPTIONS = Array.from(Array(24).keys()).map(n => ('0' + n).slice(-2)) // ['00', '01', '02', ... '23']
  const ALL_MIN_SEC_OPTIONS = Array.from(Array(60).keys()).map(n => ('0' + (n)).slice(-2)) // ['00', '01', '02', ... '59']

  function selectFor ({ value, inputName, options }) {
    return (
      <select
        value={value}
        onChange={(event) => handleInputChange(event, inputName)}
      >
        {options.map((option) => (
          <option key={`${option}-begin`} value={option}>{option}</option>
        ))}
      </select>
    )
  }

  return (
    <div>
      {selectFor({ value: newBeginDay, inputName: 'beginDay', options: ALL_DAYS })}-
      {selectFor({ value: newEndDay, inputName: 'endDay', options: ALL_DAYS })}|
      {selectFor({ value: newStartHour, inputName: 'startHour', options: ALL_HOUR_OPTIONS })}:
      {selectFor({ value: newStartMinute, inputName: 'startMinute', options: ALL_MIN_SEC_OPTIONS })}:
      {selectFor({ value: newStartSecond, inputName: 'startSecond', options: ALL_MIN_SEC_OPTIONS })}-
      {selectFor({ value: newEndHour, inputName: 'endHour', options: ALL_HOUR_OPTIONS })}:
      {selectFor({ value: newEndMinute, inputName: 'endMinute', options: ALL_MIN_SEC_OPTIONS })}:
      {selectFor({ value: newEndSecond, inputName: 'endSecond', options: ALL_MIN_SEC_OPTIONS })}
    </div>
  )
}

RecurrenceRule.propTypes = {
  recurrenceRule: PropTypes.object,
}

export default RecurrenceRule

