// Emails the app sends. In this repo nothing leaves the machine:
// sendEmail() adds the email to the outbox, and tests read it from there.
export type Email = { to: string; subject: string; text: string; html: string };

export const outbox: Email[] = [];

export function sendEmail(email: Email): void {
  outbox.push(email);
}
