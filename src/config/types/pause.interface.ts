import { Participant } from "./types";

export interface PauseProps {
  paused: boolean;
  type: PauseType;
  team?: Participant;
}

export enum PauseType {
  tactical = "Tactical",
  technical = "Technical",
}
