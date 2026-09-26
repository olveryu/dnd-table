// 阿什 Ash — 返魂者骷髅死灵法师（2024 规则，1 级）
// 来源：~/workspace/dnd/ash-character-sheet.md

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  charClass: string;
  level: number;
  background: string;
  alignment: string;
  languages: string[];
  abilities: AbilityScores;
  hp: number;
  maxHp: number;
  ac: number;
  speed: number;
  spellAttack: number;
  spellDC: number;
  spellSlots: { level: number; total: number; used: number }[];
  cantrips: string[];
  spellsKnown: string[];
  spellsPrepared: string[];
  equipment: string[];
  xp: number;
}

export const ASH: Character = {
  id: 'ash',
  name: '阿什',
  race: '返魂者 Reborn（骷髅）',
  charClass: '法师 Wizard',
  level: 1,
  background: '闹鬼者 Haunted One',
  alignment: '中立善良',
  languages: ['通用语', '精灵语'],
  abilities: { str: 8, dex: 14, con: 14, int: 17, wis: 10, cha: 10 },
  hp: 8,
  maxHp: 8,
  ac: 12,
  speed: 30,
  spellAttack: 5,
  spellDC: 13,
  spellSlots: [{ level: 1, total: 2, used: 0 }],
  cantrips: ['寒霜之触', '火焰箭', '法师之手'],
  spellsKnown: ['法师护甲', '魔法飞弹', '护盾术', '睡眠术', '油腻术', '鉴定术'],
  spellsPrepared: ['法师护甲', '魔法飞弹', '护盾术', '睡眠术'],
  equipment: ['匕首', '奥术法器（水晶）', '学者背包', '法术书', '10 gp'],
  xp: 0,
};

export function abilityMod(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatMod(mod: number): string {
  return (mod >= 0 ? '+' : '') + mod;
}
