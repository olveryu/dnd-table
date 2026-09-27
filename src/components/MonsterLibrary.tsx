import { useMemo, useState } from 'react';
import { MONSTERS, searchMonsters, type Monster } from '../data/monsters';

const ABILITY_LABELS: [keyof Monster['abilities'], string][] = [
  ['str', '力量'],
  ['dex', '敏捷'],
  ['con', '体质'],
  ['int', '智力'],
  ['wis', '感知'],
  ['cha', '魅力'],
];

function StatBlock({ m }: { m: Monster }) {
  return (
    <div style={{ border: '1px solid #a8a29e', borderRadius: 8, padding: 12, marginBottom: 8 }}>
      <h2 style={{ margin: '0 0 2px' }}>
        {m.cnName} <span style={{ fontWeight: 'normal', fontSize: 14, opacity: 0.6 }}>{m.name}</span>
      </h2>
      <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 8, fontStyle: 'italic' }}>
        {m.size} {m.type}，{m.alignment}
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.7 }}>
        <div><strong>护甲等级 AC</strong> {m.ac}</div>
        <div><strong>生命值 HP</strong> {m.hp}</div>
        <div><strong>速度</strong> {m.speed}</div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '8px 0' }}>
        {ABILITY_LABELS.map(([k, label]) => (
          <div
            key={k}
            style={{
              border: '1px solid #a8a29e', borderRadius: 6, padding: '4px 10px',
              textAlign: 'center', minWidth: 44,
            }}
          >
            <div style={{ fontSize: 11, opacity: 0.7 }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}>{m.abilities[k]}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 8 }}>
        <div><strong>挑战等级 CR</strong> {m.cr}</div>
        {m.saves && <div><strong>豁免</strong> {m.saves}</div>}
        {m.skills && <div><strong>技能</strong> {m.skills}</div>}
        {m.senses && <div><strong>感官</strong> {m.senses}</div>}
        {m.languages && <div><strong>语言</strong> {m.languages}</div>}
      </div>
      {m.traits.length > 0 && (
        <>
          <h3 style={{ fontSize: 14, margin: '8px 0 4px' }}>特性</h3>
          {m.traits.map((t) => (
            <div key={t.name} style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 4 }}>
              <strong>{t.name}。</strong> {t.text}
            </div>
          ))}
        </>
      )}
      {m.actions.length > 0 && (
        <>
          <h3 style={{ fontSize: 14, margin: '8px 0 4px' }}>动作</h3>
          {m.actions.map((a) => (
            <div key={a.name} style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 4 }}>
              <strong>{a.name}。</strong> {a.text}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function MonsterLibrary() {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState<Monster | null>(null);

  const results = useMemo(() => searchMonsters(q), [q]);
  const shown = results.slice(0, 100);

  return (
    <div>
      <h2 style={{ margin: '0 0 4px' }}>👹 怪物库</h2>
      <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 10 }}>
        SRD 5.2.1 怪物 · 共 {MONSTERS.length} 种
      </div>
      {sel ? (
        <div>
          <button onClick={() => setSel(null)} style={{ marginBottom: 8 }}>
            ← 返回列表
          </button>
          <StatBlock m={sel} />
        </div>
      ) : (
        <>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索：僵尸 / zombie / 恐龙 / 龙…"
            style={{
              width: '100%', boxSizing: 'border-box', padding: '10px 12px', fontSize: 15,
              borderRadius: 8, border: '1px solid #a8a29e', marginBottom: 8,
            }}
          />
          <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>
            {results.length} 条结果{results.length > 100 ? '（仅显示前 100 条）' : ''}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {shown.map((m) => (
              <button
                key={m.id}
                onClick={() => setSel(m)}
                style={{ textAlign: 'left', padding: '8px 12px' }}
              >
                <strong style={{ fontSize: 14 }}>{m.cnName}</strong>{' '}
                <span style={{ fontSize: 12, opacity: 0.6 }}>{m.name}</span>
                <div style={{ fontSize: 12, opacity: 0.65 }}>
                  CR {m.cr} · AC {m.ac} · HP {m.hpAvg} · {m.size}{m.type}
                </div>
              </button>
            ))}
            {shown.length === 0 && <div style={{ fontSize: 14, opacity: 0.6 }}>没有找到，换个关键词试试。</div>}
          </div>
        </>
      )}
    </div>
  );
}
