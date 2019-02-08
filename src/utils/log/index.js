/* eslint-disable no-console */
const w = (msg) => console.warn(`%c${msg}`, 'background: #2E2E2E; color: #F2F5A9');
const e = (msg) => console.error(`%c${msg}`, 'background: #FA5858; color: #F2F2F2');
const i = (msg) => console.info(`%c${msg}`, 'background: #8181F7; color: #F2F2F2; line-height:210%');
const l = (msg, warp = '', sender) => {
  console.info(`%c /** START ${warp}`, 'background: #181817; color: #F2F2F2');
  sender &&
    console.log(
      `%c${sender.constructor.name}`,
      'margin-left:10px; background: #181817; color: #dedede; font-style: italic;',
    );
  console.log(msg);
  console.info(`%c${warp} END **/`, 'background: #181817; color: #F2F2F2');
};

module.exports = {
  w,
  i,
  e,
  l,
};
