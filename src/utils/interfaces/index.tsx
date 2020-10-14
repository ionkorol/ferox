import { firestore } from "firebase";

export interface UserProp {
  username: string;
  class: string; //"warrior" | "wizard" | "elf";
  level: number;
  xp: number;
  health: number;
  maxHealth: number;
  maxMana: number;
  energy: {
    current: number;
    max: number;
    timestamp: firebase.firestore.Timestamp | null;
    task: string;
  };
  gold: number;
  silver: number;
  guild: firebase.firestore.DocumentReference | null;
  guild_xp: number;
  league: {
    rank: number;
    tier: "bronze" | "silver" | "gold" | string;
  };
  inventory: firebase.firestore.DocumentReference[];
  items: any;
  power: number;
  stats: {
    agility: number;
    intelligence: number;
    strength: number;
  };
  uid: string;
}
