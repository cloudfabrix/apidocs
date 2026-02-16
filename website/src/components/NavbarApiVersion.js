import React from 'react';
import { versions } from '@site/src/api-versions';
import { useVersionStore } from '@site/src/version-store';

export default function NavbarApiVersion() {
  const { version, setVersion } = useVersionStore();

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '0.5rem' }}>
      <label
        htmlFor="navbar-api-version"
        style={{ marginRight: '0.4rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
      >
        API Version:
      </label>
      <select
        id="navbar-api-version"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
        style={{
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          border: '1px solid var(--ifm-color-emphasis-300)',
          background: 'var(--ifm-background-surface-color)',
          color: 'var(--ifm-font-color-base)',
          fontSize: '0.85rem',
          cursor: 'pointer',
        }}
      >
        {versions.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>
    </div>
  );
}
