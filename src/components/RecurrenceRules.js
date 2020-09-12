import React from 'react'
import PropTypes from 'prop-types'

function RecurrenceRules({ userId, recurrenceGroup }) {
  return (
    <ul>
      {recurrenceGroup.recurrenceRules.map((recurrenceRule) => (
        <div key={recurrenceRule.id}>
          <span>{recurrenceRule.dayOfWeek}</span>
          <span>{recurrenceRule.startTime}</span>
          <span>{recurrenceRule.endTime}</span>
        </div>
      ))}
    </ul>
  )
}

RecurrenceRules.propTypes = {
  userId: PropTypes.number,
  recurrenceGroup: PropTypes.object,
}

export default RecurrenceRules

