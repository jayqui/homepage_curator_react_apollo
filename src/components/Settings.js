import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';

import LinkSubscriptions from './LinkSubscriptions';

import './Settings.css';

const RECURRENCE_GROUPS_QUERY = loader('../graphql/recurrence_group/recurrence_groups_query.graphql');

function Settings({ userId }) {
  const { loading, error, data } = useQuery(RECURRENCE_GROUPS_QUERY, {
    variables: { userId },
  });

  if (loading) return <p>Loading . . .</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.recurrenceGroups.map((recurrenceGroup) => (
        <div key={recurrenceGroup.id} className='RecurrenceGroup'>
          <h3>{recurrenceGroup.name}</h3>
          <div>
            <ul>
              {recurrenceGroup.recurrenceRules.map((recurrenceRule) => (
                <div key={recurrenceRule.id}>
                  <span>{recurrenceRule.dayOfWeek}</span>
                  <span>{recurrenceRule.startTime}</span>
                  <span>{recurrenceRule.endTime}</span>
                </div>
              ))}
            </ul>
            <LinkSubscriptions userId={userId} recurrenceGroup={recurrenceGroup} />
          </div>
        </div>
      ))}
    </div>
  )
}

Settings.propTypes = {
  userId: PropTypes.number,
}

export default Settings
