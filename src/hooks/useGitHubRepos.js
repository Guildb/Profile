import { useEffect, useState } from 'react';

const CACHE_KEY = 'github-repo-meta';
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;

const readCache = () => {
  try {
    const raw = window.sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.storedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeCache = (data) => {
  try {
    window.sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ storedAt: Date.now(), data })
    );
  } catch {
    // Storage full or unavailable. The data is still usable this session.
  }
};

const toPercentages = (languageBytes) => {
  const total = Object.values(languageBytes).reduce((sum, n) => sum + n, 0);
  if (!total) return [];
  return Object.entries(languageBytes)
    .map(([name, bytes]) => ({ name, percent: Math.round((bytes / total) * 100) }))
    .sort((a, b) => b.percent - a.percent);
};

const fetchRepo = async (slug) => {
  const [meta, languages] = await Promise.all([
    fetch(`https://api.github.com/repos/${slug}`),
    fetch(`https://api.github.com/repos/${slug}/languages`),
  ]);
  if (!meta.ok || !languages.ok) throw new Error(`GitHub returned ${meta.status}`);
  const [metaJson, languagesJson] = await Promise.all([meta.json(), languages.json()]);
  return {
    languages: toPercentages(languagesJson),
    updatedAt: metaJson.pushed_at ?? null,
  };
};

const useGitHubRepos = (slugs) => {
  const [data, setData] = useState(() => readCache() ?? {});
  const [status, setStatus] = useState(() => (readCache() ? 'ready' : 'idle'));
  const key = slugs.join(',');

  useEffect(() => {
    if (readCache()) {
      setStatus('ready');
      return undefined;
    }

    let cancelled = false;
    setStatus('loading');

    Promise.all(slugs.map((slug) => fetchRepo(slug).then((value) => [slug, value])))
      .then((entries) => {
        if (cancelled) return;
        const next = Object.fromEntries(entries);
        writeCache(next);
        setData(next);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        // Rate limit, network failure or a renamed repo. The cards render
        // from static data; this enrichment is strictly additive.
        setData({});
        setStatus('failed');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { data, status };
};

export default useGitHubRepos;
