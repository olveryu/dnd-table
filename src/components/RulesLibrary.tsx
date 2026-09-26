import { useMemo, useState } from 'react';
import { searchRules, kindLabel, SPELL_COUNT, type RuleEntry, type RuleKind } from '../data/rules';
import RulePopup from './RulePopup';

const KIND_FILTERS: { key: RuleKind | 'all'; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'skill', label: '技能' },
  { key: 'condition', label: '状态' },
  { key: 'spell', label: '法术' },
  { key: 'feature', label: '职业特性' },
];

export default function RulesLibrary() {
  const [q, setQ] = useState('');
  const [kind, setKind] = useState<RuleKind | 'all'>('all');
  const [sel, setSel] = useState<RuleEntry | null>(null);

  const results = useMemo(() => searchRules(q, kind === 'all' ? undefined : kind), [q, kind]);
  const shown = results.slice(0, 100);

  return (
    <div>
      <h2 style={{ margin: '0 0 4px' }}>📖 规则库</h2>
      <div style={{ fontSize: 12, opacity: 0.65, marginBottom: 10 }}>
        SRD 5.2.1（2024 规则）· 技能 18 · 状态 16 · 法术 {SPELL_COUNT} · 法师特性
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="搜索：火球术 / fireball / 倒地 / prone…"
        style={{
          width: '100%', boxSizing: 'border-box', padding: '10px 12px', fontSize: 15,
          borderRadius: 8, border: '1px solid #a8a29e', marginBottom: 8,
        }}
      />
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {KIND_FILTERS.map((f) => (
          <button key={f.key} className={kind === f.key ? 'active' : ''} onClick={() => setKind(f.key)} style={{ fontSize: 13 }}>
            {f.label}
          </button>
        ))}
      </div>
      <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>
        {results.length} 条结果{results.length > 100 ? '（仅显示前 100 条）' : ''}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {shown.map((e) => (
          <button
            key={e.id}
            onClick={() => setSel(e)}
            style={{ textAlign: 'left', padding: '8px 12px' }}
          >
            <span style={{ fontSize: 11, opacity: 0.6, marginRight: 8 }}>[{kindLabel(e.kind)}]</span>
            <strong style={{ fontSize: 14 }}>{e.title}</strong>
            <div style={{ fontSize: 12, opacity: 0.65 }}>{e.subtitle}</div>
          </button>
        ))}
        {shown.length === 0 && <div style={{ fontSize: 14, opacity: 0.6 }}>没有找到，换个关键词试试。</div>}
      </div>
      <RulePopup entry={sel} onClose={() => setSel(null)} />
    </div>
  );
}
