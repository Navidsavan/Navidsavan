
import {TicketOnNumberData} from '../actions/AuthConstants';
const intialState = {
  onNumberData: [],
  
};

const TicketOnNumberReducer = (state = intialState, action) => {
   if (action.type === TicketOnNumberData.NUMBER_DATA) {
    return {...state, onNumberData: action.payload};
  } 
  return state;
};

export default TicketOnNumberReducer;