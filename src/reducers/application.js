  export const SET_DAY = "SET_DAY";
  export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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