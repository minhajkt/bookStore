export function generatePurchaseId(seq: number): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); 
  return `${year}-${month}-${seq}`;
}
