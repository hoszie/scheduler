import React, { useState, useEffect } from "react";
// import React, { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA: 
        return {}  
      case SET_INTERVIEW: {
        return { ...state, 
          
        } 
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    } 
  }

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
    console.log('this is the appt', appointment);
    console.log('this is the appts', appointments);
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
  console.log('state', state)
  console.log('setState', setState)

  const setDay = day => setState({ ...state, day });

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
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}