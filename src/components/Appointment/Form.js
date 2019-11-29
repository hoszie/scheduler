import React, { useState } from 'react';
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    setInterviewer(null);
  } 

  function cancel() {
    reset();
    props.onCancel();
  }

  function save() {
    // TODO: if only we could pass the current student name, and also pass the current interviewer id.  that'd be grand.
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>Cancel</Button>
            <Button confirm onClick={save}>Save</Button>
            {/* onSubmit={event => event.preventDefault()} */}
          </section>
        </section>
    </main>
  )
}