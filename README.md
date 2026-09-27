# dnd-table · D&D 跑团桌

为「单人玩家 + AI DM」设计的轻量 VTT（虚拟桌游），中文，手机优先。

## 跑起来

```bash
npm install
npm run dev
```

浏览器打开终端显示的地址（一般是 http://localhost:5173）。

## 功能（MVP）

- 🗺 **战斗地图**：网格、token 点选移动（速度校验、困难地形）、量尺、先攻条、HP 条（阿什 HP 与人物卡双向同步）
- 🎲 **骰子**：公开掷骰 log（localStorage 持久化），修正 + 优势/劣势
- 🧙 **人物卡**：阿什完整卡展示，技能/法术/特性点击查 SRD 原文
- 📖 **规则库**：SRD 5.2.1 全文搜索（18 技能 / 16 状态 / 339 法术全中文名 / 法师特性）
- 👹 **怪物**：330 个 SRD 怪物 stat block，中英双语搜索

## 部署

线上：https://olveryu.github.io/dnd-table/（从 gh-pages 分支读取）。

目前手动部署：`npm run build` 后把 dist 推到 gh-pages。`.github/workflows/deploy.yml`（push main 自动构建部署）已写好，暂存在 `ci/auto-deploy` 分支——因当前 gh token 缺 `workflow` 授权推不进 main，跑 `gh auth refresh -s workflow` 授权后即可合并启用。

## 目录

```
src/
  components/   BattleMap / DiceRoller / CharacterSheet
  data/
    characters/ 人物数据（阿什）
    monsters/   怪物库（SRD 5.2.1，330 个，已导入）
    rules/      SRD 5.2.1 规则库（技能 18 / 状态 16 / 法术 339 / 法师特性，已导入）
    campaign/   战役日志（TODO 二期）
```

## 规则

D&D 5e 2024（SRD 5.2.1，CC-BY-4.0）。返魂者沿用 2014 版（官方允许无新版老选项照用）。

> This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.
