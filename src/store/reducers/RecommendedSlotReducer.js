
import {RecommendedSlotsData} from '../actions/AuthConstants';
const intialState = {
  SlotsData: [],
  
};

const RecommendedSlotReducer = (state = intialState, action) => {
   if (action.type === RecommendedSlotsData.SLOT_DATA) {
    return {...state, SlotsData: action.payload};
  } 
  return state;
};

export default RecommendedSlotReducer;