import _Match from "preact-router/match";
import { JSXInternal } from "preact/src/jsx";

interface MatchProps {
  matches: boolean;
  path: string;
  url: string;
}

interface Props {
  path: string;
  children: JSXInternal.Element;
}

export const Match = ({ path, children }: Props) => (
  <_Match path={path}>
    {({ matches }: MatchProps) => matches && children}
  </_Match>
);

export const NoMatch = ({ path, children }: Props) => (
  <_Match path={path}>
    {({ matches }: MatchProps) => !matches && children}
  </_Match>
);
