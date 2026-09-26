// TODO（二期）：ToA 常见怪物数据（地精、迅猛龙、蛇人……），一键部署到战斗地图
export interface Monster {
  id: string;
  name: string;
  hp: number;
  ac: number;
  speed: number;
  color: string;
}

export const MONSTERS: Monster[] = [];
