import styled from "styled-components";
import { Link } from "../components/Link";
import { Overlay } from "../components/Overlay";
import { UI } from "../components/UI";

export const Home = () => {
  return (
    <UI>
      <Overlay />
      <StyledList>
        <Link href="/workouts">Workouts</Link>
        <Link href="/explore">Explore</Link>
      </StyledList>
    </UI>
  );
};

const StyledList = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  & > * {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;
