const data = [
  ['Excellent', '可以正常活動', '可以正常活動', '良好'],
  ['Good', '可以正常活動', '可以正常活動', 'XXX'],
  ['LightlyPolluted', '可以正常活動', '任何人如果有不適，如眼痛，咳嗽或喉嚨痛等，應該考慮減少戶外活動。', 'XXX'],
  ['ModeratelyPolluted', '任何人如果有不適，如眼痛，咳嗽或喉嚨痛等，應該考慮減少戶外活動。', '有心臟、呼吸道及心血管疾病的成人與孩童，應減少體力消耗，特別是減少戶外活動。\n老年人應減少體力消耗。\n具有氣喘的人可能需增加使用吸入劑的頻率。', '對所有族群不健康'],
  ['HeavilyPolluted', '任何人如果有不適，如眼痛，咳嗽或喉嚨痛等，應該考慮減少戶外活動。', '有心臟、呼吸道及心血管疾病的成人與孩童，應減少體力消耗，特別是減少戶外活動。\n老年人應減少體力消耗。\n具有氣喘的人可能需增加使用吸入劑的頻率。', 'XXX'],
  ['SeverelyPolluted', '任何人如果有不適，如眼痛，咳嗽或喉嚨痛等，應減少體力消耗，特別是減少戶外活動。', '有心臟、呼吸道及心血管的成人與孩童，以及老年人應避免體力消耗，特別是避免戶外活動。\n具有氣喘的人可能需增加使用吸入劑的頻率。', 'XXX']
];

let showTemp = false;

const whichLevel = (numOfAQI) => {
  const level = Math.ceil(numOfAQI/ 50);
  if (level === 6) level = 5;
  else if (level > 6) level = 6;
  return level;
}

const setTheme = (level) => {
  const index = level - 1;
  document.documentElement.setAttribute('theme', data[index][0]);
  $('.normalGroup pre').html(data[index][1]);
  $('.specialGroup pre').html(data[index][2]);
  $('.airAttention').html(data[index][3]);
}

const reRenderPM = (numOfAQI) => {
  $('.pm25Data').html(
    `現在 <strong>PM2.5</strong> 指數 <strong class="AQI">${numOfAQI}</strong>`
  );
  $('.tempData').hide(300);
  $('.pm25Data').show(300);
  
  showTemp = true;
};

const moreThan2Min = (timebyAPI) => {
  const nowData = new Date();
  const nowTimestamp = nowData / 1000;
  const compareTimestamp = Date.parse(new Date(timebyAPI)) / 1000;
  return (nowTimestamp - compareTimestamp) > 2 * 60;
}

const reRenderTemp = (temp, humidity) => {
  $('.tempData').html(
    `現在溫度 <strong>${temp} °C</strong> 濕度 <strong class="humidity">${humidity} %</strong>`
  );
  $('.pm25Data').hide(300);
  $('.tempData').show(300);
  // $('.updateTime').html(time);
  showTemp = false;
}
const getData = () => {
  const url = './api.php';
  $.ajax({
    type: 'GET',
    url,
    dataType: 'json',
    error: jqXHR => console.log('error',jqXHR),
    success: (res) => {
      console.log('data', res);
      console.log('time', Date());
      if (!showTemp) reRenderPM(res.pm2point5);
      else {
        reRenderTemp(res.temperature, res.humidity);
      }
      const level = whichLevel(res.pm2point5);
      setTheme(level);
      $('.updateTime').html(res.date_time);
      if (moreThan2Min(res.date_time)) $('.updateTime').html('氣象站離線');
    }
  });
};
const updateImgSrc = () => {
  const imgs = $('img.lazy');
  $(imgs).each((i, img) => {
    $(img).attr('src', $(img).data('src'));
    $(img).removeAttr('data-src', )
  });
}
let i = 0;
let timer;
const nowData = new Date();
const stopTimer = () => clearInterval(timer);
console.log(nowData.toLocaleDateString());
$(document).ready(() => {
  stopTimer();
  setTimeout("updateImgSrc()", 2000);
  getData();
  i++;
  console.log('i', i);
  timer = setInterval("getData()",10000);
});

