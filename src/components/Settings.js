import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import './Settings.css';
import RecurrenceGroup from './RecurrenceGroup';

const RECURRENCE_GROUPS_QUERY = loader('../graphql/recurrence_group/recurrence_groups_query.graphql');

function Settings({ userId }) {
  const { loading, error, data } = useQuery(RECURRENCE_GROUPS_QUERY, {
    variables: { userId },
  });

  if (loading) return <p>Loading . . .</p>;
  if (error) {
    console.log('error', error)
    return <p>Error :(</p>;
  }

  return (
    <div>
      <>
        <Box m={1}>
          <Button variant="contained">Add New</Button>
        </Box>
        {data.recurrenceGroups.map((recurrenceGroup) => (
          <RecurrenceGroup
            key={recurrenceGroup.id}
            userId={userId}
            recurrenceGroup={recurrenceGroup}
          />
        ))}
      </>
    </div>
  )
}

Settings.propTypes = {
  userId: PropTypes.number,
}

export default Settings
