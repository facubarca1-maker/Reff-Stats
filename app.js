// Este archivo se incluye con <script type="text/babel" src="app.js"></script>
// Incluye React, ReactDOM, y el componente principal

// Para usar: reemplaza el contenido del JSX original en reftrack-coarfe-app.jsx
// Este archivo monta la app en el root

const root = ReactDOM.createRoot(document.getElementById('root'));

// Aquí va el contenido completo del reftrack-coarfe-app.jsx
// Por ahora, mostrar mensaje de que necesita ser configurado

root.render(
  <div style={{
    minHeight: '100dvh',
    background: '#080e18',
    color: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '48px' }}>🚀</div>
    <h1 style={{ fontSize: '24px', fontWeight: '900', margin: 0 }}>RefTrack</h1>
    <p style={{ color: '#2e3f5c', margin: '0 0 20px', fontSize: '14px' }}>
      Para usar la aplicación completa, copia el contenido de<br/>
      <code style={{ background: '#0b1221', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', marginTop: '8px', display: 'block' }}>
        reftrack-coarfe-app.jsx
      </code>
      y pégalo en lugar de este contenido.
    </p>
    <p style={{ color: '#2e3f5c', fontSize: '12px', margin: 0 }}>
      O abre el JSX en <a href="https://claude.new" style={{ color: '#f97316' }}>claude.new</a>
    </p>
  </div>
);
