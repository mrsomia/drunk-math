import type { NextPage } from "next";
import { useState } from "react";
import { calcAlcoholInKG, calcBAC } from "../utils";

const Home: NextPage = () => {
  const [isMale, setIsMale] = useState<null | boolean>(null);
  const [weight, setWeight] = useState<null | number>(null);
  const [ml, setMl] = useState<null | number>(null);
  const [abv, setAbv] = useState<null | number>(null);
  const [time, setTime] = useState<null | number>(null);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  };

  const handleMlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMl(Number(e.target.value));
  };

  const handleAbvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbv(Number(e.target.value));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(Number(e.target.value));
  };

  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Drunk Math
        </h1>
        <form className="grid grid-cols-2 gap-6 m-4 " onSubmit={(e) => e.preventDefault()}>
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
                <label htmlFor="Male">Male</label>
              </div>
              <div className="m-2">
                <input
                  type="radio"
                  name="Gender"
                  id="Female"
                  value="Female"
                  onChange={() => setIsMale(false)}
                  checked={isMale == null || !isMale}
                  />
                <label htmlFor="Female">Female</label>
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
                onChange={handleWeightChange}
                />
            </div>

          </div>

          <fieldset>
            <legend className="text-center font-medium py-3">Alcohol</legend>

            <div className="flex flex-col">
              <label htmlFor="ml">Volume in ml</label>
              <input
                className="border-solid border-2 border-gray-700 round-sm p-1 m-2"
                type="number"
                name="ml"
                id="ml"
                value={ml ?? ""}
                onChange={handleMlChange}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="ABV">ABV of this bevarage</label>
              <input
                className="border-solid border-2 border-gray-700 round-sm p-1 m-2"
                type="number"
                name="ABV"
                id="ABV"
                value={abv ?? ""}
                onChange={handleAbvChange}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="mins">Over how many Mins</label>
              <input
                className="border-solid border-2 border-gray-700 round-sm p-1 m-2"
                type="number"
                name="time"
                id="mins"
                value={time ?? ""}
                onChange={handleTimeChange}
              />
            </div>
          </fieldset>
        </form>

        {weight && isMale != null  && time && ml && abv && (
          <div>
            <p>
              Your BAC would be:{" "}
              {`${calcBAC({
                alcholConsumed: calcAlcoholInKG(ml, abv),
                isMale: isMale,
                weightInKG: weight,
                timeInHours: (time/60),
              })}`}
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;

