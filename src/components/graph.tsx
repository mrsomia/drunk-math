import { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { AxisOptions } from 'react-charts'
import { calcMLRequired } from '../utils';

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

interface GraphProps {
  isMale: boolean;
  ABV: number;
  weight: number;
  time?: number;
}

// does this need to be an object with keys???
const bacDrunkLevels = [0.02, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]

type Amount = {
  time: number;
  amount: number;
}

type Series = {
  label: string;
  data: Amount[]
}

function Graph({ isMale, ABV, weight, time = 6}: GraphProps) {

  const data: Series[] = bacDrunkLevels.map(BAC => {
    const total = calcMLRequired({ isMale, ABV, time , weightInKG: weight, BAC})
    const timeUp = Math.ceil(time)
    const amounts = new Array(timeUp).fill(0).map((_, i) => {
      return {
      time: i,
      amount: (i+1) * (total/timeUp),
      }
    })
    return {
      label: BAC.toString(),
      data: amounts
    }
  })

  const primaryAxis = useMemo(
     (): AxisOptions<Amount> => ({
       getValue: datum => datum.time
     }),
     []
   )

  const secondaryAxes = useMemo(
     (): AxisOptions<Amount>[] => [
       {
         getValue: datum => datum.amount,
       },
     ],
     []
   )

  console.log(data)

  return (
    <div>
      <Chart 
        options={{
        data,
        //@ts-expect-error
        primaryAxis,
        //@ts-expect-error
        secondaryAxes
      }}
      />
    </div>
  )}

export default Graph

