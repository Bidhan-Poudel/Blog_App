const API_URL = "http://localhost:3000/users/";

export async function getUsers() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Error fetching data");
  }
  return res.json();
}

export async function login({ email, password }) {
    const res = await fetch(`${API_URL}?email=${email}&password=${password}`);
    const data = await res.json();
  
    if (data.length === 0) {
      throw new Error("Error logging in");
    }
  
    return data[0];
  }

  export async function register({ email, password, name, role }) {
    // Check if email already exists
    const emailExistsResponse = await fetch(API_URL + `?email=${email}`);
    if (emailExistsResponse.ok) {
        const existingUser = await emailExistsResponse.json();
        if (existingUser) {
            throw new Error("Email already exists");
        }
    } else {
        throw new Error("Error checking email existence");
    }

    // Register new user if email doesn't exist
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, role }),
    });

    if (!res.ok) {
        throw new Error("Error registering");
    }

    return res.json();
}
