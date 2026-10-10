const API_BASE = "http://localhost:9090/api";

/**
 * Generic API request wrapper
 */
async function api(path, options = {}) {
  const token = localStorage.getItem("novaToken");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API_BASE + path, {
    ...options,
    headers
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    // Ignore JSON parse errors (e.g., empty response)
  }

  if (!response.ok) {
    throw new Error(data?.message || data?.error || "Request failed");
  }

  return data;
}

/**
 * Login API
 */
async function apiLogin(email, password) {
  const data = await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  localStorage.setItem("novaToken", data.token);
  localStorage.setItem("novaLoggedIn", "true");
  localStorage.setItem("novaUser", JSON.stringify({
    name: data.name,
    email: data.email
  }));

  return data;
}

/**
 * Register API
 */
async function apiRegister(payload) {
  const data = await api("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  localStorage.setItem("novaToken", data.token);
  localStorage.setItem("novaLoggedIn", "true");
  localStorage.setItem("novaUser", JSON.stringify({
    name: data.name,
    email: data.email
  }));

  return data;
}
