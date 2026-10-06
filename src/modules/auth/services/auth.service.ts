type Credentials = {
  email: string;
  password: string;
};

export async function login(email: string, password: string) {
  const credentials: Credentials = {
    email: email,
    password: password,
  };

  const response = await fetch(`${import.meta.env.VITE_API_URL}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const responseBody = await response.json();
    localStorage.setItem("token", responseBody.token);
    // return responseBody.user;
    return {
      user: responseBody.user,
      roles: responseBody.roles,
    };
  }
  return null;
}

export async function getUserLogin() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (response.ok) {
    const responseBody = await response.json();
    return responseBody;
  }

  return null;
}

export async function logout() {
  return await fetch(`${import.meta.env.VITE_API_URL}logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
