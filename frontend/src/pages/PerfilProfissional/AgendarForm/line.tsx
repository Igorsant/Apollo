export const Line = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ width: '50px', height: '1px', backgroundColor: 'gray' }}></div>
  </div>
);

export const ActiveLine = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--header)' }}></div>
  </div>
);
