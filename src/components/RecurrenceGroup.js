import React from 'react'
import PropTypes from 'prop-types'

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LinkSubscriptions from './LinkSubscriptions';
import RecurrenceRules from './RecurrenceRules';
import RecurrenceGroupName from './RecurrenceGroupName';

import './RecurrenceGroup.css'

function RecurrenceGroup({ userId, recurrenceGroup }) {
  return (
    <div key={recurrenceGroup.id} className='RecurrenceGroup'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className='recurrenceGroupName'>
            <RecurrenceGroupName recurrenceGroup={recurrenceGroup} />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <RecurrenceRules userId={userId} recurrenceGroup={recurrenceGroup} />
            <LinkSubscriptions userId={userId} recurrenceGroup={recurrenceGroup} />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

RecurrenceGroup.propTypes = {
  userId: PropTypes.number,
  recurrenceGroup: PropTypes.object,
}

export default RecurrenceGroup
