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

export const UserObject = {
  username: "Test Player",
  class: "warrior",
  level: 12,
  xp: 0,
  health: 100,
  maxHealth: 100,
  maxMana: 100,
  energy: {
    current: 10,
    max: 10,
    timestamp: null,
    task: "",
  },
  gold: 0,
  silver: 0,
  guild: null,
  guild_xp: 0,
  league: {
    rank: 100,
    tier: "bronze",
  },
  inventory: [],
  items: {
    chest: null,
    cloak: null,
    gloves: null,
    head: null,
    necklace: null,
    pants: null,
    ring: null,
    shield: null,
    shoes: null,
    shoulder: null,
    sword: null,
  },
  power: 150,
  stats: {
    agility: 50,
    intelligence: 50,
    strength: 50,
  },
  uid: "test-uid",
};
