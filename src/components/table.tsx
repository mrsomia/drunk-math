import { calcMLRequired } from '../utils';

interface TableProps {
  isMale: boolean;
  ABV: number;
  weight: number;
  time?: number;
}

// does this need to be an object with keys???
const bacDrunkLevels = [0.02, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]

function Table({ isMale, ABV, weight, time = 6}: TableProps) {

  const data  = bacDrunkLevels.map(BAC => {
    const total = calcMLRequired({ isMale, ABV, time , weightInKG: weight, BAC})
    const per30 = Math.ceil(total/(time * 2))
    return {
      BAC,
      per30,
    }
  })

  return (
    <>
      <h4 className='my-4 mx-3 text-center text-lg'>
        In {time} hours, you will reach these BAC levels if you drink the following amounts every 30 mins:
      </h4>
      <table className='my-3 border-collapse table-fixed max-w-[60%] w-full'>
        <thead>
          <tr className='border-b-2 border-solid border-gray-400'>
            <th className='p-2 px-3 font-bold text-center'>BAC</th>
            <th className='p-2 px-3 font-bold text-center'>ML</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, idx) => (
            <tr key={idx} className={`${idx % 2 === 0 ? "bg-slate-100" : ""}`}>
              <td className='p-2 px-3 text-center'>{val.BAC.toFixed(2)}</td>
              <td className='p-2 px-3 text-center'>{val.per30}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  )}

export default Table

