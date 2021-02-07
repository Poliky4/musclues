import styled from "styled-components";

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
`;

export const Exercises = () => (
  <StyledExercises>
    <StyledTitle>Exercises</StyledTitle>
  </StyledExercises>
);
