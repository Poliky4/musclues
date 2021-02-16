import styled from "styled-components";
import { Exercise } from "../engine/animation";
import { Button } from "./Button";

interface Props {
  exercises: Exercise[];
}

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

const StyledListItem = styled(Button)`
  margin-bottom: 1rem;
`;

export const Exercises = ({ exercises }: Props) => {
  return (
    <StyledExercises>
      <StyledList>
        {exercises?.map(({ name, thing }) => (
          <StyledListItem onClick={thing}>{name}</StyledListItem>
        ))}
      </StyledList>
    </StyledExercises>
  );
};
