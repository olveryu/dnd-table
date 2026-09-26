# dnd-table · D&D 跑团桌

为「单人玩家 + AI DM」设计的轻量 VTT（虚拟桌游），中文，手机优先。

## 跑起来

```bash
npm install
npm run dev
```

浏览器打开终端显示的地址（一般是 http://localhost:5173）。

## 功能（MVP）

- 🗺 **战斗地图**：网格、token 点选移动（速度校验、困难地形）、量尺、先攻条、HP 条
- 🎲 **骰子**：公开掷骰 log，修正 + 优势/劣势
- 🧙 **人物卡**：阿什完整卡展示

## 目录

```
src/
  components/   BattleMap / DiceRoller / CharacterSheet
  data/
    characters/ 人物数据（阿什）
    monsters/   怪物库（TODO 二期）
    rules/      SRD 5.2.1 规则库（技能 18 / 状态 16 / 法术 339 / 法师特性，已导入）
    campaign/   战役日志（TODO 二期）
```

## 规则

D&D 5e 2024（SRD 5.2.1，CC-BY-4.0）。返魂者沿用 2014 版（官方允许无新版老选项照用）。

> This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.
