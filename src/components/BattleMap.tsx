import { useEffect, useRef, useState } from 'react';
import { setAshHp, resetAshHp, useAshHp } from '../state/party';

// ---------- 类型 ----------
export interface Token {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  hp: number;
  maxHp: number;
  speed: number; // 尺
  team: 'pc' | 'enemy' | 'npc';
}

export interface TerrainCell {
  x: number;
  y: number;
  t: 'tree' | 'wall'; // tree = 困难地形，wall = 不可通过
}

export interface BattleMapState {
  tokens: Token[];
  terrain: TerrainCell[];
  turnIndex: number;
  order: string[];
}

// ---------- 演示数据（来自 widget 雏形） ----------
export const DEMO_STATE: BattleMapState = {
  tokens: [
    { id: 'ash', name: '阿什', x: 2, y: 8, color: '#3b82f6', hp: 8, maxHp: 8, speed: 30, team: 'pc' },
    { id: 'ally1', name: '守卫', x: 2, y: 9, color: '#22c55e', hp: 11, maxHp: 11, speed: 30, team: 'pc' },
    { id: 'e1', name: '迅猛龙A', x: 11, y: 3, color: '#ef4444', hp: 10, maxHp: 10, speed: 30, team: 'enemy' },
    { id: 'e2', name: '迅猛龙B', x: 12, y: 4, color: '#ef4444', hp: 10, maxHp: 10, speed: 30, team: 'enemy' },
    { id: 'e3', name: '迅猛龙C', x: 11, y: 5, color: '#ef4444', hp: 10, maxHp: 10, speed: 30, team: 'enemy' },
  ],
  terrain: [
    { x: 6, y: 2, t: 'tree' }, { x: 7, y: 3, t: 'tree' }, { x: 6, y: 6, t: 'tree' },
    { x: 9, y: 8, t: 'tree' }, { x: 10, y: 9, t: 'tree' },
    { x: 4, y: 4, t: 'wall' }, { x: 4, y: 5, t: 'wall' },
    { x: 13, y: 7, t: 'wall' }, { x: 13, y: 8, t: 'wall' },
  ],
  turnIndex: 0,
  order: ['ash', 'ally1', 'e1', 'e2', 'e3'],
};

const COLS = 16;
const ROWS = 12;
const OX = 34; // 左侧坐标轴宽度
const OY = 26; // 顶部坐标轴高度

const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

function cellName(x: number, y: number): string {
  return String.fromCharCode(65 + x) + (y + 1);
}

interface Props {
  initial?: BattleMapState;
  title?: string;
}

export default function BattleMap({ initial = DEMO_STATE, title = '战斗地图 · 演示' }: Props) {
  const [s, setS] = useState<BattleMapState>(() => structuredClone(initial));
  const [sel, setSel] = useState<Token | null>(null);
  const [reach, setReach] = useState<Record<string, number>>({});
  const [rulerMode, setRulerMode] = useState(false);
  const [rulerPts, setRulerPts] = useState<[number, number][]>([]);
  const [info, setInfo] = useState('点选一个 token，再点绿色格子移动。每格 5 尺。');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellRef = useRef(40);

  // 阿什 token 的 HP 订阅外部 store（与人物卡双向同步）；其他 token 用本地 state
  const ashHp = useAshHp();
  const tokens: Token[] = s.tokens.map((t) =>
    t.id === 'ash' ? { ...t, hp: ashHp.hp, maxHp: ashHp.maxHp } : t
  );

  // ---------- 工具函数 ----------
  const tokAt = (x: number, y: number, tokens: Token[]): Token | undefined =>
    tokens.find((t) => t.x === x && t.y === y);
  const terrAt = (x: number, y: number): TerrainCell | undefined =>
    s.terrain.find((t) => t.x === x && t.y === y);
  const blocked = (x: number, y: number): boolean => {
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return true;
    const t = terrAt(x, y);
    return !!t && t.t === 'wall';
  };
  const moveCost = (x: number, y: number): number => {
    const t = terrAt(x, y);
    return t && t.t === 'tree' ? 2 : 1;
  };

  // BFS：token.speed 尺内可达格（困难地形 2 格/步）
  const bfs = (tok: Token): Record<string, number> => {
    const maxSteps = Math.floor(tok.speed / 5);
    const dist: Record<string, number> = {};
    const q: [number, number, number][] = [[tok.x, tok.y, 0]];
    dist[tok.x + ',' + tok.y] = 0;
    while (q.length) {
      const [x, y, d] = q.shift()!;
      for (const [dx, dy] of DIRS) {
        const nx = x + dx;
        const ny = y + dy;
        if (blocked(nx, ny)) continue;
        const o = tokAt(nx, ny, tokens);
        if (o && o.id !== tok.id) continue;
        const nd = d + moveCost(nx, ny);
        const k = nx + ',' + ny;
        if (nd <= maxSteps && (dist[k] === undefined || nd < dist[k])) {
          dist[k] = nd;
          q.push([nx, ny, nd]);
        }
      }
    }
    return dist;
  };

  // ---------- 渲染 ----------
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const resize = () => {
      const w = cv.clientWidth || 640;
      cellRef.current = Math.max(22, Math.floor((w - OX - 14) / COLS));
      cv.width = OX + COLS * cellRef.current + 14;
      cv.height = OY + ROWS * cellRef.current + 14;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const cell = cellRef.current;
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = dark ? '#1c1917' : '#fafaf9';
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.font = cell * 0.32 + 'px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 格子
    for (let x = 0; x < COLS; x++) {
      for (let y = 0; y < ROWS; y++) {
        const px = OX + x * cell;
        const py = OY + y * cell;
        const t = terrAt(x, y);
        if (t && t.t === 'wall') ctx.fillStyle = dark ? '#44403c' : '#a8a29e';
        else if (t && t.t === 'tree') ctx.fillStyle = dark ? '#14532d' : '#bbf7d0';
        else if (reach[x + ',' + y] !== undefined && !(sel && sel.x === x && sel.y === y))
          ctx.fillStyle = dark ? '#1e3a2f' : '#d1fae5';
        else ctx.fillStyle = (x + y) % 2 ? (dark ? '#292524' : '#f5f5f4') : dark ? '#1c1917' : '#ffffff';
        ctx.fillRect(px, py, cell, cell);
        ctx.strokeStyle = dark ? '#44403c' : '#e7e5e4';
        ctx.strokeRect(px + 0.5, py + 0.5, cell - 1, cell - 1);
        if (t && t.t === 'tree') {
          ctx.fillStyle = dark ? '#4ade80' : '#166534';
          ctx.fillText('♣', px + cell / 2, py + cell / 2);
        }
      }
    }

    // 坐标
    ctx.fillStyle = dark ? '#a8a29e' : '#78716c';
    for (let i = 0; i < COLS; i++) ctx.fillText(String.fromCharCode(65 + i), OX + i * cell + cell / 2, 12);
    for (let j = 0; j < ROWS; j++) ctx.fillText(String(j + 1), 14, OY + j * cell + cell / 2);

    // 量尺
    if (rulerPts.length === 2) {
      const [a, b] = rulerPts;
      const dist = Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1])) * 5;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(OX + a[0] * cell + cell / 2, OY + a[1] * cell + cell / 2);
      ctx.lineTo(OX + b[0] * cell + cell / 2, OY + b[1] * cell + cell / 2);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 14px system-ui';
      ctx.fillText(dist + ' 尺', (OX + a[0] * cell + OX + b[0] * cell) / 2 + cell / 2, (OY + a[1] * cell + OY + b[1] * cell) / 2);
    }

    // token
    const activeId = s.order[s.turnIndex % s.order.length];
    for (const t of tokens) {
      const px = OX + t.x * cell;
      const py = OY + t.y * cell;
      const r = cell * 0.38;
      if (t.id === activeId) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(px + cell / 2, py + cell / 2, r + 4, 0, 7);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
      if (sel && sel.id === t.id) {
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 3;
        ctx.strokeRect(px + 2, py + 2, cell - 4, cell - 4);
        ctx.lineWidth = 1;
      }
      ctx.fillStyle = t.color;
      ctx.beginPath();
      ctx.arc(px + cell / 2, py + cell / 2, r, 0, 7);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = 'bold ' + cell * 0.34 + 'px system-ui';
      ctx.fillText(t.name[0], px + cell / 2, py + cell / 2 - 2);
      // HP 条
      const bw = cell * 0.8;
      const frac = Math.max(0, t.hp / t.maxHp);
      ctx.fillStyle = '#00000055';
      ctx.fillRect(px + (cell - bw) / 2, py + cell - 7, bw, 5);
      ctx.fillStyle = frac > 0.5 ? '#22c55e' : frac > 0.25 ? '#f59e0b' : '#ef4444';
      ctx.fillRect(px + (cell - bw) / 2, py + cell - 7, bw * frac, 5);
    }
  }); // 每次渲染后重绘（简单可靠）

  // ---------- 交互 ----------
  const activeId = s.order[s.turnIndex % s.order.length];
  const turnLabel =
    '先攻：' +
    s.order
      .map((id, i) => {
        const t = tokens.find((x) => x.id === id);
        return (i === s.turnIndex % s.order.length ? '▶ ' : '') + (t ? t.name : id);
      })
      .join(' → ');

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const cv = canvasRef.current;
    if (!cv) return;
    const rect = cv.getBoundingClientRect();
    const cell = cellRef.current;
    const sx = cv.width / rect.width;
    const sy = cv.height / rect.height;
    const x = Math.floor(((e.clientX - rect.left) * sx - OX) / cell);
    const y = Math.floor(((e.clientY - rect.top) * sy - OY) / cell);
    if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return;

    if (rulerMode) {
      const pts: [number, number][] = [...rulerPts, [x, y]];
      if (pts.length === 2) {
        const dist = Math.max(Math.abs(pts[0][0] - pts[1][0]), Math.abs(pts[0][1] - pts[1][1])) * 5;
        setInfo(`距离：${dist} 尺（${cellName(pts[0][0], pts[0][1])} → ${cellName(x, y)}）`);
        setRulerPts([]);
        setRulerMode(false);
      } else {
        setRulerPts(pts);
        setInfo('量距离：再点第二个格子');
      }
      return;
    }

    const t = tokAt(x, y, tokens);
    if (sel && reach[x + ',' + y] !== undefined && !(sel.x === x && sel.y === y)) {
      const from = cellName(sel.x, sel.y);
      const cost = reach[x + ',' + y] * 5;
      setS((prev) => ({
        ...prev,
        tokens: prev.tokens.map((tk) => (tk.id === sel.id ? { ...tk, x, y } : tk)),
      }));
      setInfo(`${sel.name}：${from} → ${cellName(x, y)}（用了 ${cost} 尺）`);
      setSel(null);
      setReach({});
      return;
    }
    if (t) {
      const r = bfs(t);
      setSel(t);
      setReach(r);
      setInfo(`${t.name}（${t.hp}/${t.maxHp} HP，速度 ${t.speed} 尺）：绿色格可走，共 ${Object.keys(r).length - 1} 格`);
    } else {
      setSel(null);
      setReach({});
      setInfo('点选一个 token，再点绿色格子移动。每格 5 尺。');
    }
  };

  const adjustHp = (delta: number) => {
    if (!sel) return;
    if (sel.id === 'ash') {
      setAshHp(ashHp.hp + delta); // 写回 store → 人物卡同步
      return;
    }
    setS((prev) => ({
      ...prev,
      tokens: prev.tokens.map((t) =>
        t.id === sel.id ? { ...t, hp: Math.max(0, Math.min(t.maxHp, t.hp + delta)) } : t
      ),
    }));
    setSel((prev) =>
      prev ? { ...prev, hp: Math.max(0, Math.min(prev.maxHp, prev.hp + delta)) } : prev
    );
  };

  const reset = () => {
    setS(structuredClone(initial));
    resetAshHp();
    setSel(null);
    setReach({});
    setRulerMode(false);
    setRulerPts([]);
    setInfo('已重置。');
  };

  const selLive = sel ? tokens.find((t) => t.id === sel.id) ?? null : null;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 6 }}>
        <strong>{title}</strong>
        <span style={{ fontSize: 13, opacity: 0.7 }}>{turnLabel}</span>
        <button style={{ marginLeft: 'auto' }} onClick={() => setS((p) => ({ ...p, turnIndex: (p.turnIndex + 1) % p.order.length }))}>
          下一位 →
        </button>
        <button className={rulerMode ? 'active' : ''} onClick={() => { setRulerMode(!rulerMode); setRulerPts([]); setInfo(rulerMode ? '点选一个 token，再点绿色格子移动。' : '量距离：点第一个格子'); }}>
          {rulerMode ? '✕ 取消' : '📏 量距离'}
        </button>
        <button onClick={reset}>重置</button>
      </div>
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{ width: '100%', border: '1px solid #a8a29e', borderRadius: 6, touchAction: 'manipulation', cursor: 'pointer' }}
      />
      <div style={{ marginTop: 6, fontSize: 13, opacity: 0.7, minHeight: 20 }}>{info}</div>
      {selLive && (
        <div style={{ marginTop: 6, padding: 8, border: '1px solid #a8a29e', borderRadius: 6 }}>
          <strong>{selLive.name}</strong> <span>{selLive.hp}/{selLive.maxHp} HP</span>
          <br />
          <button onClick={() => adjustHp(-1)}>-1 HP</button>{' '}
          <button onClick={() => adjustHp(1)}>+1 HP</button>{' '}
          <span style={{ fontSize: 12, opacity: 0.7 }}>速度 {selLive.speed} 尺</span>
        </div>
      )}
      <div style={{ display: 'none' }}>{activeId}</div>
    </div>
  );
}
