import styled from "styled-components";
import { Exercise } from "../engine/animation";

interface Props {
  exercises: Exercise[];
}

export const Exercises = ({ exercises }: Props) => {
  return (
    <StyledExercises>
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
  width: 12rem;
  right: 0;
  top: 10vh;
  pointer-events: none;
`;

const StyledList = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-end;
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
  user-select: none;
  background-color: grey;
  pointer-events: all;
`;
