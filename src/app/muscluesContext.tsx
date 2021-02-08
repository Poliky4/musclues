import { ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { musclues } from "../engine";
import { Exercise } from "../engine/animation";

interface Props {
  children: ComponentChildren;
}

interface Context {
  exercises: Exercise[];
}

export const MuscluesContext = createContext<Context>(null);
export const MuscluesContextProvider = ({ children }: Props) => {
  const [stuff, setStuff] = useState<Context>(null);

  useEffect(() => {
    const stuff = musclues();
    setStuff(stuff);
  }, []);

  if (!stuff) return null;
  return (
    <MuscluesContext.Provider value={stuff}>
      {children}
    </MuscluesContext.Provider>
  );
};
