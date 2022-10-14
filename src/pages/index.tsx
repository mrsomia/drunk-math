import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [isMale, setIsMale] = useState<null | boolean>(null)
  const [weight, setWeight] = useState<null | number>(null)

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value))
  }

  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
          Drunk Math
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>Gender</legend>
            <div>
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
            <div>
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

          <input
            type="number"
            name="weight"
            id="weight"
            value={weight ?? ""}
            onChange={handleWeightChange}
          />
          <label htmlFor="weight">weight</label>

        </form>
      </main>
    </>
  );
};

export default Home;

