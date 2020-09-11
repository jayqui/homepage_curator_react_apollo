import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client';

import './Settings.css';

const RECURRENCE_GROUPS_QUERY = gql`
`;

function Settings() {
  const [loadingMessage, setLoadingMessage] = useState('Loading . . .');
  const { loading, error, data } = useQuery(RECURRENCE_GROUPS_QUERY);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingMessage(msg => msg + ' .')
    }, 100);
    return () => clearInterval(interval);
  }, [loading])

  if (loading) return <p>{loadingMessage}</p>;
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
