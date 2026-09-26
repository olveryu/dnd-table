// TODO（二期）：SRD 5.2.1 规则库导入（CC-BY-4.0）——战斗动作、状态、法术、怪物全文搜索
export interface RuleEntry {
  id: string;
  title: string;
  body: string;
}

export const RULES: RuleEntry[] = [];
