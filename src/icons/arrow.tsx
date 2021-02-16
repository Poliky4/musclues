import styled from "styled-components";
import { Icon } from "./icon";

interface Props {
  className?: string;
}

export const Arrow = ({ className }: Props) => (
  <Icon className={className} viewBox="0 0 24 24">
    <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
  </Icon>
);

export const ArrowUp = styled(Arrow)`
  transform: rotateZ(-90deg);
`;

export const ArrowRight = styled(Arrow)`
  transform: rotateZ(0deg);
`;

export const ArrowDown = styled(Arrow)`
  transform: rotateZ(90deg);
`;

export const ArrowLeft = styled(Arrow)`
  transform: rotateZ(180deg);
`;
