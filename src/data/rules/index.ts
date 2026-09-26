// SRD 5.2.1 规则库 — 入口与全文搜索
// This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1")
// by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd.
// The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International
// License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

export { SKILLS, SKILLS_INTRO } from './skills';
export type { Skill } from './skills';
export { CONDITIONS } from './conditions';
export type { Condition } from './conditions';
export { SPELLS, SPELL_COUNT } from './spells';
export type { Spell } from './spells';
export { WIZARD_FEATURES } from './wizard';
export type { ClassFeature } from './wizard';

import { SKILLS } from './skills';
import { CONDITIONS } from './conditions';
import { SPELLS } from './spells';
import { WIZARD_FEATURES } from './wizard';

export type RuleKind = 'skill' | 'condition' | 'spell' | 'feature';

export interface RuleEntry {
  kind: RuleKind;
  id: string;
  title: string; // 中文名（有）或英文名
  subtitle: string; // 英文名 / 附加信息
  body: string; // SRD 原文（markdown 纯文本）
  searchText: string; // 用于搜索的合并文本
}

const KIND_LABEL: Record<RuleKind, string> = {
  skill: '技能',
  condition: '状态',
  spell: '法术',
  feature: '职业特性',
};

export function kindLabel(kind: RuleKind): string {
  return KIND_LABEL[kind];
}

function spellBody(s: (typeof SPELLS)[number]): string {
  const levelLabel = s.level === 0 ? 'Cantrip' : `Level ${s.level}`;
  const lines = [
    `${levelLabel} ${s.school}${s.classes.length ? ` (${s.classes.join(', ')})` : ''}`,
    `Casting Time: ${s.castingTime}`,
    `Range: ${s.range}`,
    `Components: ${s.components}`,
    `Duration: ${s.duration}`,
    '',
    s.text,
  ];
  return lines.join('\n');
}

/** 全部规则条目（懒加载构建一次） */
let cache: RuleEntry[] | null = null;
export function allRules(): RuleEntry[] {
  if (cache) return cache;
  const out: RuleEntry[] = [];
  for (const s of SKILLS) {
    out.push({
      kind: 'skill',
      id: `skill:${s.id}`,
      title: `${s.cnName} ${s.name}`,
      subtitle: `${s.cnAbility}（${s.ability}）检定`,
      body: `${s.cnName}（${s.name}）——${s.cnAbility}检定\n\n${s.uses}`,
      searchText: `${s.cnName} ${s.name} ${s.ability} ${s.cnAbility} ${s.uses}`.toLowerCase(),
    });
  }
  for (const c of CONDITIONS) {
    out.push({
      kind: 'condition',
      id: `condition:${c.id}`,
      title: `${c.cnName} ${c.name}`,
      subtitle: '状态 Condition',
      body: `${c.cnName}（${c.name}）\n\n${c.text}`,
      searchText: `${c.cnName} ${c.name} ${c.text}`.toLowerCase(),
    });
  }
  for (const s of SPELLS) {
    const title = s.cnName ? `${s.cnName} ${s.name}` : s.name;
    out.push({
      kind: 'spell',
      id: `spell:${s.id}`,
      title,
      subtitle: s.level === 0 ? `戏法 · ${s.school}` : `${s.level} 环 · ${s.school}`,
      body: `${title}\n\n${spellBody(s)}`,
      searchText: `${s.cnName} ${s.name} ${s.school} ${s.classes.join(' ')} ${s.text}`.toLowerCase(),
    });
  }
  for (const f of WIZARD_FEATURES) {
    out.push({
      kind: 'feature',
      id: `feature:wizard:${f.level}:${f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      title: f.name,
      subtitle: f.level === 0 ? '法师核心特性' : `法师 ${f.level} 级特性`,
      body: `${f.name}\n\n${f.text}`,
      searchText: `${f.name} wizard 法师 ${f.text}`.toLowerCase(),
    });
  }
  cache = out;
  return out;
}

/** 全文搜索（中英文均可） */
export function searchRules(query: string, kind?: RuleKind): RuleEntry[] {
  const q = query.trim().toLowerCase();
  return allRules().filter((e) => {
    if (kind && e.kind !== kind) return false;
    if (!q) return true;
    return q.split(/\s+/).every((tok) => e.searchText.includes(tok));
  });
}

/** 按 id 取条目 */
export function getRule(id: string): RuleEntry | undefined {
  return allRules().find((e) => e.id === id);
}
