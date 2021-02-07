import { useContext } from "preact/hooks";
import styled from "styled-components";
import { MuscluesContext } from "../app/muscluesContext";

export const Exercises = () => {
  const { exercises } = useContext(MuscluesContext);

  return (
    <StyledExercises>
      <StyledTitle>Exercises</StyledTitle>

      <StyledList>
        {exercises.map(({ name, thing }) => (
          <StyledListItem onClick={thing}>{name}</StyledListItem>
        ))}
      </StyledList>
    </StyledExercises>
  );
};

const StyledExercises = styled.div`
  position: absolute;
  height: 80vh;
  width: 24rem;
  right: 0;
  top: 10vh;

  background: grey;
`;

const StyledTitle = styled.h1`
  text-align: center;
  padding: 2rem;
`;

const StyledList = styled.div`
  padding: 2rem;
`;

const StyledListItem = styled.div`
  padding: 1rem;
  font-size: 1.8rem;
  text-align: center;
  border: 1px solid black;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;
