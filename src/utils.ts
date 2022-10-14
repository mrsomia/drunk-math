export function calcAlcoholInGrams(totalConsumedInML: number, ABV: number) {
  return (totalConsumedInML * ABV)/10 * 8
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
  return eBAC
}


