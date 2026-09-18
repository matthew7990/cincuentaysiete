// Publica site.json via GitHub Contents API - sin Actions, sin backend.
// Escribe en gh-pages (efecto inmediato) y en main/public/site.json (persistencia
// para futuros `npm run deploy`). El token vive solo en localStorage del admin.

const REPO = 'matthew7990/cincuentaysiete'
const API = 'https://api.github.com'

async function gh(token: string, path: string, init?: RequestInit) {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...init?.headers,
    },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`GitHub ${res.status}: ${body.slice(0, 200)}`)
  }
  return res.json()
}

async function getSha(token: string, path: string, branch: string): Promise<string | undefined> {
  try {
    const data = await gh(token, `/repos/${REPO}/contents/${path}?ref=${branch}`)
    return data.sha
  } catch {
    return undefined // el archivo no existe todavía
  }
}

async function putFile(
  token: string,
  path: string,
  content: string,
  branch: string,
  message: string,
) {
  const sha = await getSha(token, path, branch)
  await gh(token, `/repos/${REPO}/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: btoa(unescape(encodeURIComponent(content))), // utf8 -> base64
      branch,
      ...(sha ? { sha } : {}),
    }),
  })
}

export async function publishSiteJson(token: string, siteJson: string) {
  await putFile(token, 'site.json', siteJson, 'gh-pages', 'admin: actualizar site.json')
  // main queda sincronizado para que `npm run deploy` no pise los cambios
  await putFile(token, 'public/site.json', siteJson, 'main', 'admin: actualizar site.json')
}

export async function checkToken(token: string): Promise<boolean> {
  try {
    await gh(token, `/repos/${REPO}`)
    return true
  } catch {
    return false
  }
}
