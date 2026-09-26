import { useState } from 'react';
import BattleMap from './components/BattleMap';
import DiceRoller from './components/DiceRoller';
import CharacterSheet from './components/CharacterSheet';

type Tab = 'map' | 'dice' | 'sheet';

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
      </div>
      <div className="tab-content">
        {tab === 'map' && <BattleMap />}
        {tab === 'dice' && <DiceRoller />}
        {tab === 'sheet' && <CharacterSheet />}
      </div>
    </div>
  );
}
