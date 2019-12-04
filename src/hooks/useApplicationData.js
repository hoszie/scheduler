import React, { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW} from "reducers/application";
  
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