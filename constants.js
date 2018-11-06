const moment = require('moment');

const NIGHT_DEADLINE_HOUR = 23.5; // change back to 21
const AFTERNOON_DEADLINE_HOUR = 15;

const NIGHT_DEADLINE = () => moment().hour(NIGHT_DEADLINE_HOUR).toISOString();
const AFTERNOON_DEADLINE = ()=> moment().hour(AFTERNOON_DEADLINE_HOUR).toISOString();

module.exports = {
  NIGHT_DEADLINE ,
  AFTERNOON_DEADLINE,
}
