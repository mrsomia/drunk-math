import type { NextPage } from "next";
import { Dispatch, SetStateAction, useState } from "react";
import Graph from "../components/graph";
import { calcAlcoholInKG, calcBAC } from "../utils";

const Home: NextPage = () => {
  const [isMale, setIsMale] = useState<null | boolean>(null);
  const [weight, setWeight] = useState<null | number>(null);
  const [ml, setMl] = useState<null | number>(null);
  const [abv, setAbv] = useState<null | number>(null);
  const [time, setTime] = useState<null | number>(null);

  const handleNumericValueChange  = (setterFunction: Dispatch<SetStateAction<null | number>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setterFunction(value === '' ? null : Number(value));
    }
  }

  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem] mt-12">
          Drunk Math
        </h1>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 m-4 " onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">

            <fieldset className="p-2">
              <legend className="text-center font-medium py-3">Gender</legend>
              <div className="m-2">
                <input
                  type="radio"
                  name="Gendar"
                  id="Male"
                  value="Male"
                  onChange={() => setIsMale(true)}
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
                  onChange={() => setIsMale(false)}
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
                onChange={handleNumericValueChange(setWeight)}
                />
            </div>

          </div>

          <fieldset>
            <legend className="text-center font-medium py-3">Alcohol</legend>

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
                onChange={handleNumericValueChange(setAbv)}
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
                onChange={handleNumericValueChange(setTime)}
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
                onChange={handleNumericValueChange(setMl)}
                />
            </div>

          </fieldset>
        </form>

        {weight && isMale !== null  && time && ml && abv && (
          <div>
            <p>
              Your BAC would be:{" "}
              {`${calcBAC({
                alcholConsumed: calcAlcoholInKG(ml, abv),
                isMale: isMale,
                weightInKG: weight,
                timeInHours: time,
              })}`}
            </p>
          </div>
        )}

        { weight && isMale !== null && abv &&
          <Graph weight={weight} isMale={isMale} ABV={abv} time={time ? time : undefined} />
        }
      </main>
    </>
  );
};

export default Home;

