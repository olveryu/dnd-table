// 阿什（队伍）HP 的极简外部 store —— 人物卡与战斗地图双向同步
// useSyncExternalStore: 组件用 useAshHp() 订阅；写入用 setAshHp()。

import { useSyncExternalStore } from 'react';
import { ASH } from '../data/characters/ash';

export interface AshHpState {
  hp: number;
  maxHp: number;
}

let state: AshHpState = { hp: ASH.hp, maxHp: ASH.maxHp };
const listeners = new Set<() => void>();

function emit(): void {
  listeners.forEach((l) => l());
}

/** 设置阿什 HP，clamp 到 0..maxHp */
export function setAshHp(hp: number): void {
  const next = Math.max(0, Math.min(state.maxHp, Math.round(hp)));
  if (next !== state.hp) {
    state = { ...state, hp: next };
    emit();
  }
}

/** 重置为人物卡初始值（战斗地图"重置"用） */
export function resetAshHp(): void {
  if (state.hp !== ASH.hp || state.maxHp !== ASH.maxHp) {
    state = { hp: ASH.hp, maxHp: ASH.maxHp };
    emit();
  }
}

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): AshHpState {
  return state;
}

export function useAshHp(): AshHpState {
  return useSyncExternalStore(subscribe, getSnapshot);
}
