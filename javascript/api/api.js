// Student Levels API
export function getStudentLevels() {
  return fetch('index.php?module=intern&action=levelRest').then(res => res.json());
}

// Majors and Programs API
export function getMajors() {
  return fetch('index.php?module=intern&action=MajorsProgramsRest').then(res => res.json());
}

export function postMajor(major) {
  return fetch('index.php?module=intern&action=MajorsProgramsRest', { method: 'POST', body: JSON.stringify(major) }).then(res => res.json());
}

export function patchMajor(major) {
  return fetch('index.php?module=intern&action=MajorsProgramsRest', { method: 'PATCH', body: JSON.stringify(major) }).then(res => res.json());
}

// CIP Codes API
export function getCipCodes() {
  return fetch('index.php?module=intern&action=CipCodeRest').then(res => res.json());
}
