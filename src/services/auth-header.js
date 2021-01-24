export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.data.token) {
    // For Spring Boot back-end
    // return { Authorization: "Bearer " + user.accessToken };

    // for Node.js Express back-end
    return { "x-access-token": user.data.token };
  } else {
    return {};
  }
}
