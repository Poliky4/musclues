import styled from "styled-components";
import { Exercises } from "../components/Exercises";
import { UI } from "../components/UI";
import { Exercise } from "../engine/animation";

interface Props {
  exercises: Exercise[];
}

export const Explore = ({ exercises }: Props) => {
  return (
    <UI>
      <StyledExplore>
        <Exercises exercises={exercises} />
      </StyledExplore>
    </UI>
  );
};

const StyledExplore = styled.div`
  width: 100%;
  height: 100%;
`;
