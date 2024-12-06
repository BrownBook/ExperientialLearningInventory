export function getMajors() {
  return fetch('index.php?module=intern&action=MajorsProgramsRest').then(res => res.json());
}

export function getCipCodes() {
  return fetch('index.php?module=intern&action=CipCodeRest').then(res => res.json());
}
