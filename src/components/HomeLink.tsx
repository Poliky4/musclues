import styled, { keyframes } from "styled-components";
import { ArrowLeft } from "../icons/arrow";
import { NoMatch } from "../utils/Match";

export const HomeLink = () => (
  <NoMatch path="/">
    <StyledHomeLink href="/">
      <ArrowLeft />
    </StyledHomeLink>
  </NoMatch>
);

const enter = keyframes`
  from {
    transform:
      translate3d(0, 100%, 0)
      scale3d(0, 0, 1);
  }

  to {
    transform:
      translate3d(0, 0, 0)
      scale3d(1, 1, 1);
  }
`;

const StyledHomeLink = styled.a`
  position: absolute;
  bottom: 1rem;
  left: calc(50% - 2rem);
  display: inline-block;
  font-size: 2rem;
  color: black;
  background-color: orange;
  width: 4rem;
  height: 4rem;
  border-radius: 999rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;

  animation: ${enter} 0.4s forwards;
`;
