import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';

const RECURRENCE_GROUPS_QUERY = loader('../graphql/recurrence_group/recurrence_groups_query.graphql');
const UPDATE_LINK_SUBSCRIPTION = loader('../graphql/link_subscription/update_link_subscription.graphql');
const DELETE_LINK_SUBSCRIPTION = loader('../graphql/link_subscription/delete_link_subscription.graphql');

function LinkSubscription({ linkSubscription, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(linkSubscription.url);

  const urlEditInputEl = useRef(null);

  const [updateLinkSubscription] = useMutation(UPDATE_LINK_SUBSCRIPTION, {
    onCompleted: () => setIsEditing(false),
  });
  const [deleteLinkSubscription] = useMutation(DELETE_LINK_SUBSCRIPTION, {
    refetchQueries: [{ query: RECURRENCE_GROUPS_QUERY, variables: { userId }}],
  });

  useEffect(() => {
    urlEditInputEl.current && urlEditInputEl.current.focus();
  }, [isEditing])

  function handleNewUrlSubmit(event) {
    event.preventDefault();
    updateLinkSubscription({
      variables: {
        linkSubscriptionId: linkSubscription.id,
        url: newUrl,
      }
    })
  }

  function handleNewUrlChange(event) {
    setNewUrl(event.target.value);
  }

  function handleCancelUrlClick() {
    setNewUrl(linkSubscription.url);
    setIsEditing(false);
  }

  function handleDeleteClick() {
    const confirmed = window.confirm(`really delete ${linkSubscription.url}?`);
    if (confirmed) {
      deleteLinkSubscription({
        variables: {
          linkSubscriptionId: linkSubscription.id
        }
      });
    }
  }

  const renderStaticState = () => (
    <li>
      {linkSubscription.url}
      <button type='button' onClick={() => setIsEditing(true)}>Edit</button>
      <button type='button' onClick={handleDeleteClick}>Delete</button>
    </li>
  )

  const renderEditingState = () => (
    <li key={linkSubscription.id}>
      <form onSubmit={handleNewUrlSubmit}>
        <input ref={urlEditInputEl} onChange={handleNewUrlChange} value={newUrl} />
        <button type='submit'>Save</button>
        <button onClick={handleCancelUrlClick} type='button'>Cancel</button>
      </form>
    </li>
  )

  return isEditing ? renderEditingState() : renderStaticState()
}

LinkSubscription.propTypes = {
  linkSubscription: PropTypes.object,
}

export default LinkSubscription
