const moment = require('moment');

const getCurrentTimeISO = () => moment().toISOString();
const createKey = (isoTimeStamp) => moment(isoTimeStamp).format('YYYY_MM_DD_a');


const checkValidTimeStamp = (timestamp) =>  (new Date(timestamp).getTime() > 0);
const checkValidMode = (mode) => (mode === 'driver' || mode === 'passanger');

const validateRequestCRUD = (startTime, mode) => {
  let currentTime = getCurrentTimeISO();
  let night_deadline = NIGHT_DEADLINE();
  let afternoon_deadline = AFTERNOON_DEADLINE();
  // check API RULE #1
  if(moment(startTime).dayOfYear()-1 === moment(night_deadline).dayOfYear()){
    if(currentTime > night_deadline){ // if current time is beyond the deadline;
      return {error:true, message:'Cannot modify request after deadline'};
    }
  }else if(moment(startTime).dayOfYear() === moment(night_deadline).dayOfYear() && currentTime > afternoon_deadline){
    return {error:true, message:'Cannot modify request after deadline'};
  }
  // check API RULE #2
  let key = createKey(startTime);
  if(requests[key]){
    return {error:true, message:'Cannot create two requests in the same time window'};
  }
  // check API RULE #3:
  let isAMPM = key.slice(key.length-2);

  if(isAMPM === 'pm'){ // we are going to check that there is no request in the morning with different mode
    let morningKey = moment(startTime).hour(0).format('YYYY_MM_DD_a');
    if(requests[morningKey] && requests[morningKey].mode !== mode){
      return {error:true, message:'Cannot create a driver request in the afternoon if there is a passenger request in the morning'}
    }
  }else{
    let afternoonKey = moment(startTime).hour(13).format('YYYY_MM_DD_a');
    if(requests[afternoonKey] && requests[afternoonKey].mode !== mode){
      return {error:true, message:'Cannot create a passanger request in the morning if there is a driver request in the morning'}
    }
  }

  return {error:false};
}

// Purpose: Given the startTime and mode, it makes sure these are withing the contraints given in the instructions
const validateRequest = (startTime, mode) => {

  if(!checkValidTimeStamp(startTime)){
    return {error:true, message:"Invalid start time"}
  }
  if(!checkValidMode(mode)){
    return {error:true, message:"Invalid mode"}
  }
  let crudValidation = validateRequestCRUD(startTime, mode);

  if(crudValidation.error){
    return crudValidation;
  }

  return {error:false};
}

module.exports = {
  getCurrentTimeISO,
  createKey,
  validateRequest,
}
