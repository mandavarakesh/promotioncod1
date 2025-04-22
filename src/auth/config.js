
export default {
  oidc: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    issuer: import.meta.env.VITE_ISSUER_LINK,
    redirectUri: window.location.origin + "/login/callback",
    scopes: ['openid', 'profile', 'email', 'offline_access'],
    pkce: import.meta.env.VITE_PKCE_ENABLE,
    disableHttpsCheck: import.meta.env.VITE_DISABLE_HTTPS_CHECK,
    postLogoutRedirectUri: `${window.location.origin}/logout/callback`,
    tokenManager: {
      storage: "localStorage",
      autoRenew: true
    }
  }
};
