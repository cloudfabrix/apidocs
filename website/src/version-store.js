import { useState, useEffect, useCallback } from 'react';
import { defaultVersion } from '@site/src/api-versions';

// Simple global state shared between the navbar selector and the viewer page.
// Uses a custom event so any component can subscribe to version changes.

const EVENT_NAME = 'api-version-change';
let _current = defaultVersion;

function broadcast(v) {
  _current = v;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: v }));
}

export function useVersionStore() {
  const [version, _setVersion] = useState(_current);

  useEffect(() => {
    function onUpdate(e) {
      _setVersion(e.detail);
    }
    window.addEventListener(EVENT_NAME, onUpdate);
    return () => window.removeEventListener(EVENT_NAME, onUpdate);
  }, []);

  const setVersion = useCallback((v) => {
    broadcast(v);
  }, []);

  return { version, setVersion };
}
