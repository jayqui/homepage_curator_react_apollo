import React from 'react'
import PropTypes from 'prop-types'

import RecurrenceRule from './RecurrenceRule'

function RecurrenceRules({ recurrenceGroup }) {
  return (
    <ul>
      {recurrenceGroup.recurrenceRules.map((recurrenceRule) => (
        <RecurrenceRule key={recurrenceRule.id} recurrenceRule={recurrenceRule} />
      ))}
    </ul>
  )
}

RecurrenceRules.propTypes = {
  recurrenceGroup: PropTypes.object,
}

export default RecurrenceRules

