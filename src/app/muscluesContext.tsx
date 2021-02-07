import { ComponentChildren, createContext } from "preact";
import { useEffect, useState } from "preact/hooks";
import { musclues } from "../engine";

interface Props {
  children: ComponentChildren;
}

export const MuscluesContext = createContext(null);
export const MuscluesContextProvider = ({ children }: Props) => {
  const [stuff, setStuff] = useState(null);

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
