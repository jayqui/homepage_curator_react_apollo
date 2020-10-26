import React, { useState, useRef, useEffect } from 'react'
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import PropTypes from 'prop-types'

const UPDATE_RECURRENCE_GROUP = loader('../graphql/recurrence_group/mutations/update_recurrence_group.graphql');

function RecurrenceGroupName({ recurrenceGroup }) {
  const { name } = recurrenceGroup

  const [isEditingName, setIsEditingName] = useState(false)
  const [newRecurrenceGroupName, setNewRecurrenceGroupName] = useState(name)
  const nameEditInputEl = useRef(null);
  const [updateRecurrenceGroupName] = useMutation(UPDATE_RECURRENCE_GROUP, {
    onCompleted: () => setIsEditingName(false),
  })

  useEffect(() => {
    nameEditInputEl.current && nameEditInputEl.current.focus();
  }, [isEditingName])

  function handleNameChange(event) {
    setNewRecurrenceGroupName(event.target.value)
  }

  function handleNewNameSubmit(event) {
    event.preventDefault();
    updateRecurrenceGroupName({
      variables: {
        recurrenceGroupId: recurrenceGroup.id,
        name: newRecurrenceGroupName,
      }
    })
  }

  function handleCancelClick() {
    setNewRecurrenceGroupName(recurrenceGroup.name)
    setIsEditingName(false)
  }

  function renderRecurrenceGroupNameStaticMarkup() {
    return(
      <>
        <h3>
          {recurrenceGroup.name}
          <button type='button' onClick={() => setIsEditingName(true)}>
            Edit
          </button>
        </h3>
      </>
    )
  }

  function renderRecurrenceGroupNameEditInput() {
    return(
      <form onSubmit={handleNewNameSubmit}>
        <input ref={nameEditInputEl} onChange={handleNameChange} value={newRecurrenceGroupName} />
        <button type='submit'>Save</button>
        <button onClick={handleCancelClick} type='button'>Cancel</button>
      </form>
    )
  }

  return (
    isEditingName ?
      renderRecurrenceGroupNameEditInput() :
      renderRecurrenceGroupNameStaticMarkup()
  )
}

RecurrenceGroupName.propTypes = {

}

export default RecurrenceGroupName

