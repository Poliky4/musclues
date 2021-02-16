import styled from "styled-components";
import { Overlay } from "../components/Overlay";
import { UI } from "../components/UI";

export const Workouts = () => (
  <UI>
    <Overlay />
    <StyledWorkouts>
      <StyledTitle>Workouts</StyledTitle>
    </StyledWorkouts>
  </UI>
);

const StyledWorkouts = styled.div`
  position: relative;
`;
const StyledTitle = styled.h1`
  color: orange;
  text-align: center;
`;
