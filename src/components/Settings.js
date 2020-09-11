import React from 'react'
import { useQuery, gql } from '@apollo/client';

import './Settings.css';

const RECURRENCE_GROUPS_QUERY = gql`
{
  recurrenceGroups(userId: 2) {
    id
    name
    recurrenceRules {
      id
      dayOfWeek
      endTime
      startTime
    }
    linkSubscriptions {
      id
      url
    }
  }
}
`;

function Settings() {
  const { loading, error, data } = useQuery(RECURRENCE_GROUPS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {data.recurrenceGroups.map((recurrenceGroup) => (
        <div className='RecurrenceGroup'>
          <h3 key={recurrenceGroup.id}>{recurrenceGroup.name}</h3>
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
            <ul>
              {recurrenceGroup.linkSubscriptions.map((linkSubscription) => (
                <li key={linkSubscription.id}>{linkSubscription.url}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Settings
