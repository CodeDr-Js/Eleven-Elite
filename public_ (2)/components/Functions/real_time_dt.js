
async function sendReq(e,nth) {
    // console.log('Sending REQ>><<',e);
    if (e.method == "GET") {const response=await fetch(e.url);return response.json();}
}

async function getRealTimeDate(){

    sendReq({url:'http://worldtimeapi.org/api/ip',method:'GET'})
    .then((res)=>{let newDate= new Date(res.datetime);console.log({newDate});return newDate})
  
}


export default getRealTimeDate