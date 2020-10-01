import { firestore } from "firebase";

export interface UserProp {
  username: string;
  class: string; //"warrior" | "wizard" | "elf";
  level: number;
  xp: number;
  health: number;
  maxHealth: number;
  maxEnergy: number;
  maxMana: number;
  energy: number;
  gold: number;
  silver: number;
  guild: firestore.DocumentReference | null;
  guild_xp: number;
  inventory: firestore.DocumentReference[];
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
  health: 1000,
  maxHealth: 1111,
  maxEnergy: 1111,
  maxMana: 1111,
  energy: 1000,
  gold: 0,
  silver: 0,
  guild: null,
  guild_xp: 0,
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
  uid: 'test-uid'
};
