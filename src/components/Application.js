import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment";
import "components/Application.scss";
import DayList from "./DayList";
import {getAppointmentsForDay, 
        getInterview,
        getInterviewersForDay } from "../helpers/selectors"

export default function Application() {

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`/api/appointments/${id}`, { interview });
  }
  
  function cancelInterview(id) {

    const nullAppointment = {
      ...state.appointments[id],
      interview: null
    };
    const nullAppointments = {
      ...state.appointments,
      [id]: nullAppointment
    };
    setState({
      ...state,
      nullAppointments
    });
    return axios.delete(`/api/appointments/${id}`);
  }
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day);

  useEffect(() => {
    Promise.all([
      axios(`/api/days`),
      axios(`/api/appointments`),
      axios(`/api/interviewers`)
    ]).then((all) => {
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
  }, []);

  const appointmentList = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (<Appointment 
            key={appointment.id} 
            id={appointment.id}
            time={appointment.time}
            interview={interview}
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            />
          );
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
