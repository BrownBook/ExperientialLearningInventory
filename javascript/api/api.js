// Student Levels API
export function getStudentLevels() {
  return fetch('index.php?module=intern&action=levelRest').then(res => res.json());
}

// Majors and Programs API
export function getMajors() {
  return fetch('index.php?module=intern&action=MajorsProgramsRest').then(res => res.json());
}

export async function postMajor(major) {
  const response = await fetch('index.php?module=intern&action=MajorsProgramsRest', { method: 'POST', body: JSON.stringify(major) });

  if (!response.ok) {
    const responseJson = await response.json();
    console.error('postMajor error response', responseJson);
    throw new Error(responseJson.errorMessage);
  }

  return response.json();
}

export async function patchMajor(major) {
  const response = await fetch('index.php?module=intern&action=MajorsProgramsRest', {
    method: 'PATCH',
    body: JSON.stringify(major)
  });

  if (!response.ok) {
    const responseJson = await response.json();
    console.error('patchMajor error response', responseJson);
    throw new Error(responseJson.errorMessage);
  }

  return response.json();
}

// CIP Codes API
export function getCipCodes() {
  return fetch('index.php?module=intern&action=CipCodeRest').then(res => res.json());
}
