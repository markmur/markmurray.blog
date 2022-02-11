import { useState, useEffect } from 'react';

type LoadScriptParams = Parameters<typeof loadScript>;

type ScriptState = 'loading' | 'done' | 'error';

const SCRIPTS_LOADED: Record<string, Promise<boolean>> = {};

export function loadScript(src: string, options?: {module?: boolean}) {
  const isScriptLoaded: Promise<boolean> = SCRIPTS_LOADED[src];

  if (isScriptLoaded) {
    return isScriptLoaded;
  }

  const promise = new Promise<boolean>((resolve, reject) => {
    const script = document.createElement('script');
    if (options?.module) {
      script.type = 'module';
    }
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      reject(false);
    };
    document.body.appendChild(script);
  });

  SCRIPTS_LOADED[src] = promise;

  return promise;

}


/**
 * The `useLoadScript` hook loads an external script tag on the client-side.
 */
export function useLoadScript(
  url: LoadScriptParams[0],
  options?: LoadScriptParams[1],
): ScriptState {
  const [status, setStatus] = useState<ScriptState>('loading');

  useEffect(() => {
    async function loadScriptWrapper() {
      try {
        setStatus('loading');
        await loadScript(url, options);
        setStatus('done');
      } catch (error) {
        setStatus('error');
      }
    }

    loadScriptWrapper();
  }, [url, JSON.stringify(options)]);

  return status;
}