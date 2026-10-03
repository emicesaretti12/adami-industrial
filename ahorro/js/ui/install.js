let deferred = null;

export function initInstall(onChange) {
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferred = e;
    onChange?.();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    onChange?.();
  });
}

export const canPromptInstall = () => deferred !== null;

export async function promptInstall() {
  if (!deferred) return false;
  deferred.prompt();
  const { outcome } = await deferred.userChoice;
  deferred = null;
  return outcome === "accepted";
}

export const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  navigator.standalone === true;

export const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
