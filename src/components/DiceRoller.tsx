import { useState } from 'react';

// 公开骰子：点骰即掷，修正 + 优势/劣势，结果公开记录（localStorage 持久化）
const DICE = [20, 12, 10, 8, 6, 4, 100];
const LOG_KEY = 'dnd-table:dice-log';
const LOG_MAX = 30;

function fmtMod(m: number): string {
  return (m >= 0 ? '+' : '') + m;
}

function loadLog(): string[] {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr)
      ? arr.filter((x) => typeof x === 'string').slice(0, LOG_MAX)
      : [];
  } catch {
    return [];
  }
}

export default function DiceRoller() {
  const [mod, setMod] = useState(0);
  const [adv, setAdv] = useState(0); // 0 普通 1 优势 2 劣势
  const [log, setLog] = useState<string[]>(loadLog);

  const saveLog = (next: string[]) => {
    const capped = next.slice(0, LOG_MAX);
    try {
      localStorage.setItem(LOG_KEY, JSON.stringify(capped));
    } catch {
      /* 存储满了就忽略 */
    }
    setLog(capped);
  };

  const clearLog = () => {
    try {
      localStorage.removeItem(LOG_KEY);
    } catch {
      /* 忽略 */
    }
    setLog([]);
  };

  const roll = (d: number) => {
    let r: number;
    let detail: string;
    if (d === 20 && adv !== 0) {
      const a = 1 + Math.floor(Math.random() * 20);
      const b = 1 + Math.floor(Math.random() * 20);
      r = adv === 1 ? Math.max(a, b) : Math.min(a, b);
      detail = `d20[${a},${b}]${adv === 1 ? '优' : '劣'}`;
    } else {
      r = 1 + Math.floor(Math.random() * d);
      detail = `d${d}[${r}]`;
    }
    const total = r + mod;
    const crit = d === 20 && r === 20 ? ' 💥大成功' : d === 20 && r === 1 ? ' 🕳大失败' : '';
    saveLog([`${detail}${fmtMod(mod)} = ${total}${crit}`, ...log]);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {DICE.map((d) => (
          <button key={d} onClick={() => roll(d)} style={{ padding: '10px 14px', fontSize: 16, fontWeight: 'bold' }}>
            d{d}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, fontSize: 14 }}>
        <span>修正</span>
        <button onClick={() => setMod(mod - 1)}>−</button>
        <strong>{fmtMod(mod)}</strong>
        <button onClick={() => setMod(mod + 1)}>＋</button>
        <button onClick={() => setAdv((adv + 1) % 3)}>{['普通', '优势', '劣势'][adv]}</button>
        <button style={{ marginLeft: 'auto' }} onClick={clearLog}>清空记录</button>
      </div>
      <div style={{ fontSize: 14, maxHeight: 220, overflowY: 'auto', borderTop: '1px solid #a8a29e', paddingTop: 6 }}>
        {log.length ? (
          log.map((e, i) => (
            <div key={i} style={{ padding: '2px 0', borderBottom: '1px dotted #a8a29e' }}>{e}</div>
          ))
        ) : (
          <div style={{ opacity: 0.6 }}>点上面的骰子开掷，结果公开记录在这里。</div>
        )}
      </div>
    </div>
  );
}
