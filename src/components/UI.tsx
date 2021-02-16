import styled from "styled-components";

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const UI = ({ children }: Props) => <StyledUI>{children}</StyledUI>;

const StyledUI = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
`;
