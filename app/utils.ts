export function calcAlcoholInKG(totalConsumedInML: number, ABV: number) {
  const alcoholInML = totalConsumedInML * (ABV/100)
  return (alcoholInML/10 * 8)/1000
}

export function calcBAC({ alcholConsumed, isMale, weightInKG, timeInHours }: {
  alcholConsumed: number
  isMale: boolean;
  weightInKG: number;
  timeInHours: number;
}) {
  const metabolism = isMale ? 0.015 : 0.017
  const waterRatio = isMale ? 0.68 : 0.55
  const eBAC = alcholConsumed / (waterRatio * weightInKG) * 100 - (metabolism * timeInHours)
  return Math.max(eBAC, 0)
}

export function calcMLRequired({ isMale, weightInKG, ABV, BAC, time } : {
  isMale: boolean;
  weightInKG: number;
  ABV: number;
  BAC: number;
  time: number;
}) {
  const metabolism = isMale ? 0.015 : 0.017
  const waterRatio = isMale ? 0.68 : 0.55
  const alcoholInKG = (BAC + (metabolism * time)) / 100 * (waterRatio * weightInKG)
  const alcoholInML = alcoholInKG * 1000 * 10/8
  const mlToDrink = alcoholInML * (100/ABV)
  return mlToDrink
}
