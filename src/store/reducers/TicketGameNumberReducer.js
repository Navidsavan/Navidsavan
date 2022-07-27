
import {TicketsModelData} from '../actions/AuthConstants';
const intialState = {
  RecommendedGameModelData: [],
  
};

const TicketGameNumberReducer = (state = intialState, action) => {
   if (action.type === TicketsModelData.MODEL_DATA) {
    return {...state, RecommendedGameModelData: action.payload};
  } 
  return state;
};

export default TicketGameNumberReducer;