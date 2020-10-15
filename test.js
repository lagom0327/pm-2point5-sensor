// const nowData = new Date();
// console.log(nowData.toLocaleString());
// let nowTime = Math.floor(nowData / 1000);
// console.log('now', nowTime)
// const str = '2019-11-04 11:03:09';
// let time = Date.parse(new Date(str)) / 1000;
// // console.log(time/1000/ 60)
// const diff = nowTime - time;
// console.log('dif', diff)

// if ((nowTime - time) > 2 * 60) console.log('more 2')
let time = Date.parse(new Date('氣象站離線'))
console.log('time', time)

const moreThan2Min = (timebyAPI) => {
  const nowData = new Date();
  console.log(nowData.toLocaleString() )
  const nowTimestamp = nowData / 1000;
  const compareTimestamp = Date.parse(new Date(timebyAPI)) / 1000;
  console.log('now', nowTimestamp);
  return (nowTimestamp - compareTimestamp) > 2 * 60;
}

console.log(moreThan2Min('2019-11-04 11:03:09'))