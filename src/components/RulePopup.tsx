import type { RuleEntry } from '../data/rules';

/** 规则原文弹窗：展示 SRD 条目全文 */
export default function RulePopup({ entry, onClose }: { entry: RuleEntry | null; onClose: () => void }) {
  if (!entry) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff', color: '#1c1917', borderRadius: 12, maxWidth: 560,
          width: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e7e5e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 16 }}>{entry.title}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{entry.subtitle}</div>
          </div>
          <button onClick={onClose} style={{ fontSize: 16, padding: '4px 10px' }}>✕</button>
        </div>
        <div style={{ padding: 16, overflowY: 'auto', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
          {entry.body}
        </div>
        <div style={{ padding: '8px 16px', borderTop: '1px solid #e7e5e4', fontSize: 11, opacity: 0.55 }}>
          原文来自 SRD 5.2.1（CC-BY-4.0）
        </div>
      </div>
    </div>
  );
}
