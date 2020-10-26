import React from 'react'
import PropTypes from 'prop-types'

import LinkSubscriptions from './LinkSubscriptions';
import RecurrenceRules from './RecurrenceRules';
import RecurrenceGroupName from './RecurrenceGroupName';

function RecurrenceGroup({ userId, recurrenceGroup }) {
  return (
    <div key={recurrenceGroup.id} className='RecurrenceGroup'>
      <RecurrenceGroupName recurrenceGroup={recurrenceGroup} />
      <div>
        <RecurrenceRules userId={userId} recurrenceGroup={recurrenceGroup} />
        <LinkSubscriptions userId={userId} recurrenceGroup={recurrenceGroup} />
      </div>
    </div>
  )
}

RecurrenceGroup.propTypes = {
  userId: PropTypes.number,
  recurrenceGroup: PropTypes.object,
}

export default RecurrenceGroup
