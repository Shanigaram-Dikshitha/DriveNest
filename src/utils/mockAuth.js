const PASSWORD_KEY = "mockPasswordHash";

async function hashPassword(password) {
  const encoder = new TextEncoder();

  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  const hashArray = Array.from(
    new Uint8Array(hashBuffer)
  );

  return hashArray
    .map((byte) =>
      byte.toString(16).padStart(2, "0")
    )
    .join("");
}

export async function setRegisteredPassword(password) {
  const hash = await hashPassword(password);

  localStorage.setItem(
    PASSWORD_KEY,
    hash
  );
}

export async function checkRegisteredPassword(password) {
  const savedHash =
    localStorage.getItem(PASSWORD_KEY);

  if (!savedHash) {
    return false;
  }

  const enteredHash =
    await hashPassword(password);

  return enteredHash === savedHash;
}

export function hasRegisteredPassword() {
  return Boolean(
    localStorage.getItem(PASSWORD_KEY)
  );
}

export function clearRegisteredPassword() {
  localStorage.removeItem(PASSWORD_KEY);
}

/* Reset password */
export async function resetRegisteredPassword(password) {
  const hash = await hashPassword(password);

  localStorage.setItem(
    PASSWORD_KEY,
    hash
  );
}