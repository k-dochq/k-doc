export function isKdocEmployeeEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith('@k-doc.kr');
}

