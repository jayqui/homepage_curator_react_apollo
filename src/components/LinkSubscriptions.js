import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';

import LinkSubscription from './LinkSubscription';

import './LinkSubscriptions.css';

const RECURRENCE_GROUPS_QUERY = loader('../graphql/recurrence_group/recurrence_groups_query.graphql');
const CREATE_LINK_SUBSCRIPTION = loader('../graphql/link_subscription/mutations/create_link_subscription.graphql');

function LinkSubscriptions({ recurrenceGroup, userId }) {
  const [newUrl, setNewUrl] = useState('');
  const [addLinkSubscription] = useMutation(CREATE_LINK_SUBSCRIPTION, {
    refetchQueries: [{ query: RECURRENCE_GROUPS_QUERY, variables: { userId }}],
    onCompleted: () => setNewUrl(''),
  });

  function handleNewUrlChange(event) {
    event.preventDefault();
    setNewUrl(event.target.value);
  }

  function handleNewUrlSubmit(event) {
    event.preventDefault();
    addLinkSubscription({
      variables: {
        recurrenceGroupId: recurrenceGroup.id,
        url: newUrl,
      }
    });
  }

  return (
    <ul className='LinkSubscriptionUrl'>
      {recurrenceGroup.linkSubscriptions.map((linkSubscription) => (
        <LinkSubscription key={linkSubscription.id} linkSubscription={linkSubscription} userId={userId} />
      ))}
      <li>
        <form onSubmit={handleNewUrlSubmit}>
          <input name='newUrl' value={newUrl} onChange={handleNewUrlChange} />
          <button type='submit' disabled={!newUrl}>Add</button>
        </form>
      </li>
    </ul>
  )
}

export default LinkSubscriptions
