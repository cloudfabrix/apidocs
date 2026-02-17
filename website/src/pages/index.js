import React, { useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import { useVersionStore } from '@site/src/version-store';

let scalarLoaded = null;
function ensureScalarScript() {
  if (scalarLoaded) return scalarLoaded;
  if (typeof window !== 'undefined' && window.Scalar) {
    scalarLoaded = Promise.resolve();
    return scalarLoaded;
  }
  scalarLoaded = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@scalar/api-reference';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return scalarLoaded;
}

function SpecsViewer() {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = (siteConfig.baseUrl || '/').replace(/\/+$/, '');
  const { version } = useVersionStore();
  const { colorMode } = useColorMode();
  const containerRef = useRef(null);

  const isDark = colorMode === 'dark';
  const specUrl = `${baseUrl}/specs/openapi-${version}.json`;

  useEffect(() => {
    let cancelled = false;

    ensureScalarScript().then(() => {
      if (cancelled || !containerRef.current || !window.Scalar) return;
      containerRef.current.innerHTML = '';
      window.Scalar.createApiReference(containerRef.current, {
        url: specUrl,
        darkMode: isDark,
        hideDarkModeToggle: true,
        hideTestRequestButton: true,
        theme: 'default',
        layout: 'modern',
        defaultHttpClient: { targetKey: 'shell', clientKey: 'curl' },
        hiddenClients: [],
        agent: { disabled: true },
        showDeveloperTools: 'never',
      });
    });

    return () => {
      cancelled = true;
    };
  }, [specUrl, isDark]);

  return (
    <div
      ref={containerRef}
      style={{
        height: 'calc(100vh - 60px)',
        width: '100%',
        overflow: 'auto',
      }}
    />
  );
}

export default function Home() {
  return (
    <Layout title="API Reference" noFooter>
      <BrowserOnly fallback={<div style={{ height: 'calc(100vh - 60px)' }} />}>
        {() => <SpecsViewer />}
      </BrowserOnly>
    </Layout>
  );
}
