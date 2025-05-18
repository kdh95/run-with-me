export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = {
  MATCH_REQUESTS: `${BASE_URL}/api/match-requests`,
  MATCH_RESULTS: `${BASE_URL}/api/match-results`,
  NOTIFICATIONS: `${BASE_URL}/api/notifications`,
};
