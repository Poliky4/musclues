import styled from "styled-components";

interface Props {
  hide?: boolean;
}

export const Overlay = ({ hide }: Props) => (hide ? null : <StyledOverlay />);

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: all;
`;
