export interface IAUTH_CONFIG {
  domain: string,
  clientId: string,
  callbackUrl: string
}
export const AUTH_CONFIG: IAUTH_CONFIG = {
  domain: 'savetheworld.eu.auth0.com',
  clientId: 'kTT4fQVMpq1eMBguUplQM5duCwrpdfrk',
  callbackUrl: 'http://localhost:3000/callback'
}
