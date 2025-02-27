export function setTimer(timeLeft:number,callback:(leftTime:number)=>void){
    var timeleft=timeLeft;
    function handleInteval(){
        timeleft=timeleft-5;
        callback(timeleft);
    }
    const timeInterval=setInterval(handleInteval,5000)
    return timeInterval
}

export function clearTimer(intervalId:NodeJS.Timeout){
    clearInterval(intervalId);
}