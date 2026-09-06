const ACCESS_COOKIE = 'bmp_access';
const ACCESS_PAYLOAD = 'authorized-v1';

function getAccessSecret() {
  const secret = process.env.SITE_ACCESS_SECRET;

  if (!secret) {
    throw new Error('SITE_ACCESS_SECRET is not configured');
  }

  return secret;
}

export function getSitePassword() {
  const password = process.env.SITE_PASSWORD;

  if (!password) {
    throw new Error('SITE_PASSWORD is not configured');
  }

  return password;
}

async function signPayload(payload: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getAccessSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(payload)
  );

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function createAccessToken() {
  return `${ACCESS_PAYLOAD}.${await signPayload(ACCESS_PAYLOAD)}`;
}

export async function isValidAccessToken(token: string | undefined) {
  if (!token) return false;

  const separator = token.lastIndexOf('.');
  if (separator === -1) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (payload !== ACCESS_PAYLOAD) return false;

  return signature === (await signPayload(payload));
}

export function constantTimeEqual(left: string, right: string) {
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    difference |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return difference === 0;
}

export { ACCESS_COOKIE };
