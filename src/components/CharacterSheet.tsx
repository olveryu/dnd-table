import { useState } from 'react';
import { ASH, abilityMod, formatMod } from '../data/characters';
import {
  SKILLS, WIZARD_FEATURES, allRules,
  type RuleEntry,
} from '../data/rules';
import RulePopup from './RulePopup';

const ABILITY_NAMES: [keyof typeof ASH.abilities, string][] = [
  ['str', '力量'],
  ['dex', '敏捷'],
  ['con', '体质'],
  ['int', '智力'],
  ['wis', '感知'],
  ['cha', '魅力'],
];

const ABILITY_KEY: Record<string, keyof typeof ASH.abilities> = {
  Strength: 'str', Dexterity: 'dex', Constitution: 'con',
  Intelligence: 'int', Wisdom: 'wis', Charisma: 'cha',
};

// 阿什的技能熟练（法师职业：奥秘、调查；闹鬼者背景：宗教、求生）
const PROFICIENT = new Set(['arcana', 'investigation', 'religion', 'survival']);
const PROF_BONUS = 2;

// 中文法术名 → SRD 法术 id
const SPELL_CN_TO_ID: Record<string, string> = {
  '寒霜之触': 'spell:chill_touch',
  '火焰箭': 'spell:fire_bolt',
  '法师之手': 'spell:mage_hand',
  '法师护甲': 'spell:mage_armor',
  '魔法飞弹': 'spell:magic_missile',
  '护盾术': 'spell:shield',
  '睡眠术': 'spell:sleep',
  '油腻术': 'spell:grease',
  '鉴定术': 'spell:identify',
};

function ruleById(id: string): RuleEntry | undefined {
  return allRules().find((e) => e.id === id);
}

export default function CharacterSheet() {
  const c = ASH;
  const [sel, setSel] = useState<RuleEntry | null>(null);

  const skillMod = (skillId: string, ability: string) => {
    const base = abilityMod(c.abilities[ABILITY_KEY[ability]]);
    return base + (PROFICIENT.has(skillId) ? PROF_BONUS : 0);
  };

  const features = WIZARD_FEATURES.filter((f) => f.level <= 1);

  const spellChip = (cnName: string) => {
    const entry = ruleById(SPELL_CN_TO_ID[cnName]);
    return (
      <button
        key={cnName}
        onClick={() => entry && setSel(entry)}
        style={{ fontSize: 13, margin: '0 4px 6px 0' }}
      >
        {cnName}
      </button>
    );
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 4px' }}>{c.name}</h2>
      <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 12 }}>
        {c.race} · {c.charClass} {c.level} 级 · {c.background} · {c.alignment}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {ABILITY_NAMES.map(([k, label]) => (
          <div key={k} style={{ border: '1px solid #a8a29e', borderRadius: 8, padding: '6px 10px', textAlign: 'center', minWidth: 52 }}>
            <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>{c.abilities[k]}</div>
            <div style={{ fontSize: 12 }}>{formatMod(abilityMod(c.abilities[k]))}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 14, marginBottom: 12 }}>
        <span>❤️ HP <strong>{c.hp}/{c.maxHp}</strong></span>
        <span>🛡 AC <strong>{c.ac}</strong></span>
        <span>👟 速度 <strong>{c.speed} 尺</strong></span>
        <span>✨ 法术攻击 <strong>{formatMod(c.spellAttack)}</strong> · DC <strong>{c.spellDC}</strong></span>
        <span>🔷 法术位 <strong>{c.spellSlots.map((s) => `${s.level}环 ${s.total - s.used}/${s.total}`).join('，')}</strong></span>
        <span>⭐ XP <strong>{c.xp}</strong></span>
      </div>

      <h3 style={{ fontSize: 15 }}>职业特性 <span style={{ fontWeight: 'normal', fontSize: 12, opacity: 0.6 }}>（点击看 SRD 原文）</span></h3>
      <div style={{ marginBottom: 8 }}>
        {features.map((f) => {
          const entry = ruleById(
            `feature:wizard:${f.level}:${f.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
          );
          return (
            <button key={f.name} onClick={() => entry && setSel(entry)} style={{ fontSize: 13, margin: '0 4px 6px 0' }}>
              {f.name}
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
        种族特性：返魂者（2014 版，非 SRD 内容）——死亡面容、不眠、双重天性
      </div>

      <h3 style={{ fontSize: 15 }}>技能 <span style={{ fontWeight: 'normal', fontSize: 12, opacity: 0.6 }}>（点击看 SRD 说明，● 为熟练）</span></h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {SKILLS.map((s) => {
          const prof = PROFICIENT.has(s.id);
          const mod = skillMod(s.id, s.ability);
          const entry = ruleById(`skill:${s.id}`);
          return (
            <button
              key={s.id}
              onClick={() => entry && setSel(entry)}
              style={{
                fontSize: 13,
                borderColor: prof ? '#3b82f6' : undefined,
                fontWeight: prof ? 'bold' : undefined,
              }}
            >
              {prof ? '● ' : ''}{s.cnName} {formatMod(mod)}
            </button>
          );
        })}
      </div>

      <h3 style={{ fontSize: 15 }}>戏法 <span style={{ fontWeight: 'normal', fontSize: 12, opacity: 0.6 }}>（点击看法术原文）</span></h3>
      <div style={{ marginBottom: 8 }}>{c.cantrips.map(spellChip)}</div>
      <h3 style={{ fontSize: 15 }}>法术书</h3>
      <div style={{ marginBottom: 8 }}>{c.spellsKnown.map(spellChip)}</div>
      <h3 style={{ fontSize: 15 }}>已准备</h3>
      <div style={{ marginBottom: 8 }}>{c.spellsPrepared.map(spellChip)}</div>
      <h3 style={{ fontSize: 15 }}>装备</h3>
      <div style={{ fontSize: 14, marginBottom: 8 }}>{c.equipment.join('、')}</div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>语言：{c.languages.join('、')}</div>

      <RulePopup entry={sel} onClose={() => setSel(null)} />
    </div>
  );
}
