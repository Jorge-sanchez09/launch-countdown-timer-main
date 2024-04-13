type Time = `${number}:${number}:${number}:${number}`;

interface TimeLeft{
    timeLeft: number; 
    daysLeft: number; 
    hoursLeft: number; 
    minutesLeft: number; 
    secondsLeft: number;
}

const totalTime: Time = '09:00:00:00';
let previousTime = 0;

const getTargetDate = () => {
    let [daysToBeAdded, hoursToBeAdded, minutesToBeAdded, secondsToBeAdded] = totalTime.split(':');

    const currentDate: Date = new Date();
    const targetDate = currentDate;

    targetDate.setDate(currentDate.getDate() + +daysToBeAdded);
    targetDate.setHours(currentDate.getHours() + +hoursToBeAdded);
    targetDate.setMinutes(currentDate.getMinutes() + +minutesToBeAdded);
    targetDate.setSeconds(currentDate.getSeconds() + +secondsToBeAdded);

    initializeClock(targetDate.getTime());
}

const initializeClock = (milisecondsLeft: number) => {
    const updateClock = () => {
        const { timeLeft, daysLeft, hoursLeft, minutesLeft, secondsLeft } = getRemainingTime(milisecondsLeft);

        if(timeLeft <= 0){
            clearInterval(timeInterval);
            return;
        }

        const daysCard = <HTMLDivElement>document.querySelector(".container:first-child .container__card");
        const hoursCard = <HTMLDivElement>document.querySelector(".container:nth-child(2) .container__card");
        const minutesCard = <HTMLDivElement>document.querySelector(".container:nth-child(3) .container__card");
        const secondsCard = <HTMLDivElement>document.querySelector(".container:nth-child(4) .container__card");

        flipCard(daysCard, daysLeft);
        flipCard(hoursCard, hoursLeft);
        flipCard(minutesCard, minutesLeft);
        flipCard(secondsCard, secondsLeft);
    }

    updateClock();
    const timeInterval = setInterval(updateClock, 1000);
}

const flipCard = (flipCard: HTMLDivElement, time: number) => {
    const timeStr = time.toString().padStart(2, '0');
    const currentValue: string = <string>flipCard.querySelector('.card__top')!.textContent;

    if (timeStr == currentValue) return;

    const topFlipEl = document.createElement("div");
    topFlipEl.classList.add("card__top--flip");
    topFlipEl.innerText = currentValue;

    const bottomFlipEl = document.createElement("div");
    bottomFlipEl.classList.add("card__bottom--flip");
    bottomFlipEl.innerText = timeStr;

    const topHalfEl = <HTMLDivElement>flipCard.querySelector(".card__top");
    const bottomHalfEl = <HTMLDivElement>flipCard.querySelector(".card__bottom");

    topFlipEl.addEventListener("animationstart", () => {
        topHalfEl.textContent = timeStr;
    });

    topFlipEl.addEventListener("animationend", () => {
        topFlipEl.remove();
    });

    bottomFlipEl.addEventListener("animationend", () => {
        bottomHalfEl.innerText = timeStr;
        bottomFlipEl.remove();
    });

    flipCard.appendChild(topFlipEl);
    flipCard.appendChild(bottomFlipEl);
}

const getRemainingTime = (milisecondsLeft: number): TimeLeft =>{
    const timeLeft = milisecondsLeft - Date.now();
    
    let daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { timeLeft, daysLeft, hoursLeft, minutesLeft, secondsLeft };
}

getTargetDate();