function getAppointmentsForDay(state, dayOfInterest) {
  const days = state.days;
  for (let day of days) {
    if (day.name === dayOfInterest) {
      const appts = [];
      for (let appointment in state.appointments) {
        if (day.appointments.includes(state.appointments[appointment].id)) {
          appts.push(state.appointments[appointment]);
        }
      }
      return appts;
    }
  }
  return [];
}

function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewObj = {
    student: interview.student,
  }
  interviewObj.interviewer = state.interviewers[interview.interviewer]
  return interviewObj;
}

function getInterviewersForDay(state, dayOfInterest) {
  const days = state.days;
  for (let day of days) {
    if (day.name === dayOfInterest) {
      const appts = [];
      for (let interviewer in state.interviewers) {
        if (day.interviewers.includes(state.interviewers[interviewer].id)) {
          appts.push(state.interviewers[interviewer]);
        }
      }
      return appts;
    }
  }
  return [];
}

module.exports= {
  getInterview,
  getAppointmentsForDay,
  getInterviewersForDay
}