import { useState } from 'react';
import BattleMap from './components/BattleMap';
import DiceRoller from './components/DiceRoller';
import CharacterSheet from './components/CharacterSheet';
import RulesLibrary from './components/RulesLibrary';

type Tab = 'map' | 'dice' | 'sheet' | 'rules';

const ATTRIBUTION =
  'This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.';

export default function App() {
  const [tab, setTab] = useState<Tab>('map');
  return (
    <div>
      <h1 style={{ fontSize: 20, margin: '0 0 12px' }}>dnd-table · D&D 跑团桌</h1>
      <div className="tabs">
        <button className={tab === 'map' ? 'active' : ''} onClick={() => setTab('map')}>
          🗺 战斗地图
        </button>
        <button className={tab === 'dice' ? 'active' : ''} onClick={() => setTab('dice')}>
          🎲 骰子
        </button>
        <button className={tab === 'sheet' ? 'active' : ''} onClick={() => setTab('sheet')}>
          🧙 人物卡
        </button>
        <button className={tab === 'rules' ? 'active' : ''} onClick={() => setTab('rules')}>
          📖 规则库
        </button>
      </div>
      <div className="tab-content">
        {tab === 'map' && <BattleMap />}
        {tab === 'dice' && <DiceRoller />}
        {tab === 'sheet' && <CharacterSheet />}
        {tab === 'rules' && <RulesLibrary />}
      </div>
      <footer style={{ marginTop: 24, paddingTop: 12, borderTop: '1px solid #a8a29e', fontSize: 11, opacity: 0.6, maxWidth: 900 }}>
        {ATTRIBUTION}
      </footer>
    </div>
  );
}
