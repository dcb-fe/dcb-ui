export function isDef(value) {
  return value !== undefined && value !== null;
}

export function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}

export function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return isNumber(value) ? `${value}px` : value;
}
