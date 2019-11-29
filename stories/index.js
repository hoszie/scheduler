import React, { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";
import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerListItem from 'components/InterviewerListItem';
import InterviewerList from 'components/InterviewerList';

import Appointment from 'components/Appointment/index';
import Header from 'components/Appointment/Header';
import Empty from 'components/Appointment/Empty';
import Show from 'components/Appointment/Show';
import Confirm from 'components/Appointment/Confirm';
import Status from 'components/Appointment/Status';
import Error from 'components/Appointment/Error';
import Form from 'components/Appointment/Form';

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));


/* Storybook is a test environment. We need to import the component that we are testing. */
import Task from "../taskbox/src/components/Task.js";

/* This is fake data that we can pass as a prop to each version of our Task. */
export const task = {
  id: "1",
  title: "Test Task",
  state: "TASK_INBOX",
  updatedAt: new Date(2018, 0, 1, 9, 0)
};

/* We pass these actions below using the spread operator */
export const actions = {
  onPinTask: action("onPinTask"),
  onArchiveTask: action("onArchiveTask")
};

/* We start a sequence of stories, but calling the imported `storiesOf` function. */
storiesOf("Task", module)
  /* Our first story, called 'default', renders a basic Task with both actions. */
  .add("default", () => <Task task={task} {...actions} />)
  /* Our second story, called 'pinned', clones the task, and sets its state to "TASK_PINNED". */
  .add("pinned", () => (
    <Task task={{ ...task, state: "TASK_PINNED" }} {...actions} />
  ))
  /* Our third story, called 'archived', clones the task, and sets its state to "TASK_ARCHIVED". */
  .add("archived", () => (
    <Task task={{ ...task, state: "TASK_ARCHIVED" }} {...actions} />
  ));

  storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));

//////////////////  DAYLIST  /////////////
  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
    ));
////////////// INTERVIEWER ////////////////////
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));
////////////////////////////////////////////////
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("fuckThisShit")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action("crapBag")}
    />
  ));
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }]
  })
  .add("Appointment", () => <Appointment />)
  .add("Appointment with Time", () =>
  <Appointment time="12pm" />)
  .add("Appointment Empty", () => (
    <React.Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </React.Fragment>
  ))
  .add("Appointment Booked", () => (
    <React.Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </React.Fragment>
  ))
  .add("Header", () => <Header time="12pm" />)
  .add("Empty", () => <Empty onAdd={action("onAdd")} />)
  .add("Show", () => (
    <Show student={"Lydia Miller-Jones"} interviewer={interviewer} onEdit={action("onEdit")} onDelete={action("onDelete")} />
  ))
  .add("Confirm", () => (
    <Confirm message={"Delete the appointment?"} onConfirm={action("onConfirm")} onCancel={action("onCancel")} />
  ))
  .add("Status", () => <Status message={"Deleting"} /> )
  .add("Error", () => <Error message={"Could not delete appointment, mate."} onClose={action("onClose")} /> )
  .add("Edit", () => (
    <Form 
      name={'J Random Student'}
      interviewers={interviewers}
      interviewer={interviewers[0].id}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Create", () => (
    <Form 
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />  
  ))

