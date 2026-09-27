// 怪物库入口 — SRD 5.2.1 怪物数据（330 个），中英双语搜索
// This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1")
// by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd.
// The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International
// License, available at https://creativecommons.org/licenses/by/4.0/legalcode.

export { MONSTERS } from './monsters';
export type { Monster } from './monsters';

import { MONSTERS, type Monster } from './monsters';

/** 中英双语搜索：匹配中文名 / 英文名 / 体型 / 类型 */
export function searchMonsters(query: string): Monster[] {
  const q = query.trim().toLowerCase();
  if (!q) return MONSTERS;
  return MONSTERS.filter((m) =>
    q
      .split(/\s+/)
      .every(
        (tok) =>
          m.cnName.toLowerCase().includes(tok) ||
          m.name.toLowerCase().includes(tok) ||
          m.size.includes(tok) ||
          m.type.toLowerCase().includes(tok)
      )
  );
}
