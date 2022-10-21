import type { NextPage } from "next";
import { useEffect, useReducer } from "react";
import Table from "../components/table";
import { calcAlcoholInKG, calcBAC } from "../utils";
import { initialState, stateReducer } from "../state-reducer"

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const { isMale, weight, ml, abv, time } = state

  useEffect(() => {
    if (typeof window !== "undefined" && 
      JSON.stringify(state) !== JSON.stringify(initialState)) {
      console.log("saving state to local Storage")
      localStorage.setItem('state', JSON.stringify(state))
    }
  }, [state])  

  useEffect(() => {
    if (window) {
      console.log("trying to fetch state")
      const local = localStorage.getItem('state')
      if (local === null || local === JSON.stringify(initialState)) return
      dispatch({ type: 'USE-LOCAL-STATE', payload: local })
    }
  }, [])

  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem] mt-12">
          Drunk Math
        </h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 m-4 " onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">

            <fieldset className="p-2">
              <div className="m-2">
                <input
                  type="radio"
                  name="Gendar"
                  id="Male"
                  value="Male"
                  onChange={() => dispatch({
                    type: "UPDATE-IS-MALE",
                    payload: true
                    })
                  }
                  checked={isMale || false}
                />
                <label
                  htmlFor="Male"
                  className="mx-2"
                >
                  Male
                </label>
              </div>
              <div className="m-2">
                <input
                  type="radio"
                  name="Gender"
                  id="Female"
                  value="Female"
                  onChange={() => dispatch({
                    type: "UPDATE-IS-MALE",
                    payload: false,
                    })
                  }
                  checked={isMale == null ? false : !isMale}
                />
                <label
                  htmlFor="Female"
                  className="mx-2"
                >
                  Female
                </label>
              </div>
            </fieldset>

            <div className="flex flex-col">
              <label
                htmlFor="weight"
                className="font-medium p-2 py-3"
              >
                Weight in KG
              </label>
              <input
                className="border-solid border-2 border-gray-700 rounded-sm p-1 m-2"
                type="number"
                name="weight"
                id="weight"
                value={weight ?? ""}
                onChange={(e) => dispatch({
                  type: "UPDATE-WEIGHT",
                  payload: e.target.value,
                })}
              />
            </div>

          </div>

          <fieldset>
            <div className="flex flex-col">
              <label
                htmlFor="ABV"
                className="font-medium p-2"
              >
                ABV of this bevarage
              </label>
              <input
                className="border-solid border-2 border-gray-700 round-sm p-1 m-2"
                type="number"
                name="ABV"
                id="ABV"
                value={abv ?? ""}
                onChange={(e) => dispatch({
                  type: "UPDATE-ABV",
                  payload: e.target.value,
                })}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="hours"
                className="font-medium p-2"
              >
                Over How Many Hours?
              </label>
              <input
                className="border-solid border-2 border-gray-700 round-sm p-1 m-2"
                type="number"
                name="time"
                id="hours"
                value={time ?? ""}
                onChange={(e) => dispatch({
                  type: "UPDATE-TIME",
                  payload: e.target.value,
                })}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="ml"
                className="font-medium p-2"
              >
                Volume in ml
              </label>
              <input
                className="border-solid border-2 border-gray-700 round-sm p-1 m-2"
                type="number"
                name="ml"
                id="ml"
                value={ml ?? ""}
                onChange={(e) => dispatch({
                  type: "UPDATE-ML",
                  payload: e.target.value,
                })}
              />
            </div>

          </fieldset>
        </form>

        {weight && isMale !== null && time && ml && abv && (
          <div className="my-4">
            <p>
              Your BAC would be:{" "}
              {`${calcBAC({
                alcholConsumed: calcAlcoholInKG(ml, abv),
                isMale: isMale,
                weightInKG: weight,
                timeInHours: time,
              }).toFixed(2)}`}
            </p>
          </div>
        )}

        {weight && isMale !== null && abv &&
          <Table
            weight={weight}
            isMale={isMale}
            ABV={abv}
            time={time ? time : undefined}
          />
        }
      </main>
    </>
  );
};

export default Home;

