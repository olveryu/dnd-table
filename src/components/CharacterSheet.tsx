import { ASH, abilityMod, formatMod } from '../data/characters';

const ABILITY_NAMES: [keyof typeof ASH.abilities, string][] = [
  ['str', '力量'],
  ['dex', '敏捷'],
  ['con', '体质'],
  ['int', '智力'],
  ['wis', '感知'],
  ['cha', '魅力'],
];

export default function CharacterSheet() {
  const c = ASH;
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

      <h3 style={{ fontSize: 15 }}>戏法</h3>
      <div style={{ fontSize: 14, marginBottom: 8 }}>{c.cantrips.join('、')}</div>
      <h3 style={{ fontSize: 15 }}>法术书</h3>
      <div style={{ fontSize: 14, marginBottom: 8 }}>{c.spellsKnown.join('、')}</div>
      <h3 style={{ fontSize: 15 }}>已准备</h3>
      <div style={{ fontSize: 14, marginBottom: 8 }}>{c.spellsPrepared.join('、')}</div>
      <h3 style={{ fontSize: 15 }}>装备</h3>
      <div style={{ fontSize: 14, marginBottom: 8 }}>{c.equipment.join('、')}</div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>语言：{c.languages.join('、')}</div>
    </div>
  );
}
