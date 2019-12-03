import React, { useEffect, useReducer } from "react";
import axios from "axios";

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { 
          ...state, 
          day: action.day 
        }
      case SET_APPLICATION_DATA: 
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }  
      case SET_INTERVIEW: {

        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview 
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
 
        const dayId = state.days.findIndex(
          day => day.appointments.includes(action.id)
        );
        const apptIdsForDay = state.days[dayId].appointments;
        let spots = 0;
        for (var apptId in appointments) {
          let appt = appointments[apptId];
          if (appt.interview === null && apptIdsForDay.includes(Number(apptId))) {
            spots++;
          }
        }
        const day = {
          ...state.days[dayId],
          spots: spots,
        };
        const days = state.days.map((item, index) => {
          if (index !== dayId) {
            return item;
          } else {
            return day;
          }
        })

        return { 
          ...state,
          appointments: appointments,
          days: days,
        } 
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    } 
  }
  
export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(data => {
      console.log(data);
      dispatch ({ type: SET_INTERVIEW, id, interview })
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
    .then(data => {
      console.log(data);
      dispatch ({ type: SET_INTERVIEW, id, interview: null })
    });
  }


  const setDay = day => dispatch({ type: SET_DAY, day });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data
      })
    });
  }, []);
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}