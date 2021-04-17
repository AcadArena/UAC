import firebase from "../firebase";
export interface ReduxState {
  live: Live;
}

export interface WebsocketUser {
  id: string;
  room: string;
  username: string;
}
export interface Live {
  lowerThirds?: LowerThirds;
  lowerThirdsIngame?: LowerThirdsIngame;
  tournament?: Tournament;
  casters?: Caster[];
  casters_alt?: Caster[];
  match?: Match;
  match_live?: boolean;
  matches_previous?: Match[];
  matches_today?: Match[];
  matches_next?: Match[];
  websocket_users: WebsocketUser[];
  room: string;
  countdown_minutes?: number;
  logitech_mvp?: LogitechMVPProps;
  stat_player?: PlayerStatProps;
  stat_player_vs?: StatPlayerVsProps;
  stat_team_vs?: TeamVsProps;
  vs_screen?: VsScreenProps;
  live_data?: LiveData;
  swap_team_positions?: boolean;
  match_winner?: {
    live: boolean;
    team?: Participant;
  };
  container_mode?:
    | "schedule"
    | "bracket"
    | "standings_group_a"
    | "standings_group_b"
    | "highlights"
    | "stats_team_vs"
    | "stats_player"
    | "stats_player_vs"
    | "ending";
}

export interface VsScreenProps {
  team1_player_settings: Adjustments;
  team2_player_settings: Adjustments;
  team1_logo_settings: Adjustments;
  team2_logo_settings: Adjustments;
  team1_player?: Player;
  team2_player?: Player;
}

export interface LowerThirdsIngame extends LowerThirds {
  is_live: boolean;
}

export interface LiveData {
  split_title: string;
  stage: string;
  season: string;
  ingame: string;
}

export interface TeamVsProps {
  team1: TeamStatProps;
  team2: TeamStatProps;
  stat_names: string[];
  [key: string]: PlayerStatProps | any;
}
export interface TeamStatProps extends Participant {
  stats: Stat[];
}

export interface StatPlayerVsProps {
  player1: PlayerStatProps;
  player2: PlayerStatProps;
  player1_settings?: Adjustments;
  player2_settings?: Adjustments;
  stat_names: string[];
  [key: string]: PlayerStatProps | any;
}

export interface PlayerStatProps extends Player {
  stats: Stat[];
}

export interface Adjustments {
  y: number;
  x: number;
  scale: number;
  flip_x?: boolean;
  flip_y?: boolean;
}

export interface LogitechMVPProps extends PlayerStatProps {
  player_adjustments: Adjustments;
  agent_adjustments: Adjustments;
  agent:
    | "brimstone"
    | "phoenix"
    | "sage"
    | "sova"
    | "viper"
    | "cypher"
    | "reyna"
    | "killjoy"
    | "breach"
    | "omen"
    | "jett"
    | "raze"
    | "skye"
    | "yoru"
    | "astra";
}
export interface Stat {
  stat_name: string;
  stat_value: string;
  isOn: boolean;
}

export interface Caster {
  ign: string;
  name: string;
  photo?: string;
}

export type Tournaments = Tournament[];

export type LowerThirdsMode =
  | "ticker"
  | "casters"
  | "long"
  | "playerQuote"
  | "playerStats"
  | "pickem"
  | "pickemShoutout"
  | "veto";

export interface LowerThirds {
  headline: string;
  ticker: string;
  announcement_headline: string;
  announcement_content: string;
  live?: boolean;
  mode: LowerThirdsMode;
  player?: Player;
  player_quote?: string;

  shoutout?: MessageItem;
  player_stats?: {
    left?: {
      property?: string;
      value?: string;
    };
    middle?: {
      property?: string;
      value?: string;
    };
    right?: {
      property?: string;
      value?: string;
    };
  };
}

export interface Tournament {
  uid?: "";
  id: number;
  name: string;
  url: string;
  [key: string]: any;
  tournament_type: string;
  started_at: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  // state: State;
  state: string;
  ranked_by: string;
  group_stages_enabled: boolean;
  teams: boolean;
  subdomain: string | null;
  participants_count: number;
  participants: Participant[];
  matches: Match[];
  game_name: string;
  logo?: string;
}

export interface ParticipantElement {
  participant: Match;
}

export interface Participant {
  id: number;
  tournament_id: number;
  name: string;
  seed: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  final_rank: number | null;
  on_waiting_list: boolean;
  display_name_with_invitation_email_address: string;
  display_name: string;
  group_player_ids: number[];
  university_name?: string;
  university_acronym?: string;
  org_name?: string;
  org_acronym?: string;
  logo?: string;
  [key: string]: any;
  players?: Player[];
}

export interface Player {
  name: string;
  ign: string;
  photo_main?: string;
  photo_sub?: string;
  photo_profile_shot?: string;
  role?: "";
  team?: Participant;
}

export interface MatchElement {
  match: Match;
}

export interface Match {
  id: number;
  tournament_id: number;
  state: string;
  player1_id: number;
  player2_id: number;
  player1_prereq_match_id: number | null;
  player2_prereq_match_id: number | null;
  player1_is_prereq_match_loser: boolean;
  player2_is_prereq_match_loser: boolean;
  winner_id: number;
  loser_id: number;
  started_at: string;
  created_at: string;
  updated_at: string;
  identifier: string;
  has_attachment: boolean;
  round: number;
  group_id: number | null;
  underway_at: null | string;
  optional: boolean | null;
  completed_at: string;
  is_completed?: boolean;
  suggested_play_order: number;
  prerequisite_match_ids_csv: string;
  scores_csv: string;
  veto?: VetoItem[];
  badge?: string;
  schedule?: Date;
  bestOf?: number;
  [key: string]: any;
}

export interface VetoItem {
  team: {
    org_name: string;
    university_name: string;
    university_acronym: string;
    org_acronym: string;
    logo: string;
  };
  type: "ban" | "pick";
  map: ValorantMap;
  winner?: {
    org_name: string;
    university_acronym: string;
    university_name: string;
    logo: string;
  } | null;
}

export type ValorantMap = "ascent" | "bind" | "haven" | "icebox" | "split";

export interface PollItemProps {
  expiry_date_time: firebase.firestore.Timestamp;
  team1?: Participant;
  team2?: Participant;
  team1_votes: number;
  team2_votes: number;
  vote_ids: [];
  votes: VoteItem[];
  team1_votes_id: [];
  team2_votes_id: [];
  match_id: number;
  tournament_url: string;
  is_published: boolean;
  is_closed: boolean;
  match_round: number;
  is_groups: boolean;
  tournament_name: string;
  talent_votes: TalentVoteItem[];
}

export interface TalentVoteItem {
  caster: Caster;
  vote?: "team1" | "team2";
  vote_team_id?: number;
}
export interface VoteItem {
  id: string;
  vote: "team1" | "team2";
  vote_team_id: number;
  date_created: firebase.firestore.Timestamp;
  fb_link?: string;
  fb_id?: string;
  picture: string;
  name?: string;
  email: string;
  message?: MessageItem | false;
}

export interface MessageItem {
  alias: string;
  img?: string;
  message: string;
}
