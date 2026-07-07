let sessionStarted = false;

export function hasStartedSession() {
  return sessionStarted;
}

export function markSessionStarted() {
  sessionStarted = true;
}
