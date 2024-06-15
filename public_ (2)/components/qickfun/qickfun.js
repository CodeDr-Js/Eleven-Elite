import { LazyLoadImage } from "react-lazy-load-image-component";

export function numberWithCommas(x) {
  return parseFloat(x)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function toTitleStr(str) {
  try {
    let [a, b] = str[0].toUpperCase();
    b = a + str.slice(1);
    return b;
  } catch (e) {
    return str;
  }
}
export function CalculateStartDiff(countDownDate, now = new Date()) {
  let [days, hours, minutes, seconds] = [];
  if (!countDownDate) {
    countDownDate = now;
  }
  //console.log(countDownDate);
  var distance = countDownDate - now;
  var expired = distance < 0;

  if (expired) {
    [days, hours, minutes, seconds] = [0, 0, 0, 0];
  } else {
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
  }

  var counter = {
    days: `${days}d:`,
    hours: `${hours}h:`,
    minutes: `${minutes}m:`,
    seconds: `${seconds}s`,
  };
  var dhms = {
    days: `${days}`,
    hours: `${hours}`,
    minutes: `${minutes}`,
    seconds: `${seconds}`,
  };
  if (days < 1) {
    delete counter["days"];
    dhms["days"] = 0;
  }
  //   days < 1 ?[ delete (counter['days']),dhms['days']=0] : 0;
  return { counter, distance, dhms, expired };
}
export function getMinDiff(startDate, endDate = new Date()) {
  const msInMinute = 60 * 1000;
  return Math.round(Math.abs(endDate - startDate) / msInMinute);
}
export function padNum(num, targetLength = 2) {
  return num.toString().padStart(targetLength, 0);
}
export function addHours(date, hours, action = "add") {
  if (action === "remove") {
    date.setHours(date.getHours() - hours);
  } else {
    date.setHours(date.getHours() + hours);
  }
  return date;
}

export function range(start, end) { return (new Array(end - start + 1)).fill(undefined).map((_, i) => i + start); }

export function formatDateAndTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  
  const date = dateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const time = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const newDate = date + " " + time
  return newDate;
}

export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function getRealTimeDate(){
  let e = await fetch('https://worldtimeapi.org/api/ip')
  return e.json()
}

export function AddImg(ImageUrl,properties) {
  let [width,height,alt]=properties
  if(!alt){alt='📷'}
  if (!ImageUrl){
    ImageUrl='https://media.api-sports.io/football/teams/15630.png'
  }
  return (
    <span>
      <LazyLoadImage src={ImageUrl}
        width={width} height={height}
        alt={alt}
      />
     </span>
  );
}