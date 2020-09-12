import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';

const RECURRENCE_GROUPS_QUERY = loader('../graphql/recurrence_group/recurrence_groups_query.graphql');
const UPDATE_LINK_SUBSCRIPTION = loader('../graphql/link_subscription/update_link_subscription.graphql');

function LinkSubscription({ linkSubscription, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(linkSubscription.url);
  const inputEl = useRef(null);
  const [updateLinkSubscription] = useMutation(UPDATE_LINK_SUBSCRIPTION, {
    onCompleted: () => setIsEditing(false),
  });
  useEffect(() => {
    inputEl.current && inputEl.current.focus();
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
    event.preventDefault();
    setNewUrl(event.target.value);
  }

  const renderStaticState = () => (
    <li>
      {linkSubscription.url}
      <button type='button' onClick={() => setIsEditing(true)}>Edit</button>
      {/* <button type='button'>Delete</button> */}
    </li>
  )

  const renderEditingState = () => (
    <li key={linkSubscription.id}>
      <form onSubmit={handleNewUrlSubmit}>
        <input ref={inputEl} onChange={handleNewUrlChange} value={newUrl} />
        <button type='submit'>Save</button>
      </form>
    </li>
  )

  return (
    <>
      {isEditing ? renderEditingState() : renderStaticState()}
    </>
  )
}

LinkSubscription.propTypes = {
  linkSubscription: PropTypes.object,
}

export default LinkSubscription

