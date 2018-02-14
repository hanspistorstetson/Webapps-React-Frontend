import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },
  games: {
    fetchAll: () => axios.get("/api/games").then(res => res.data.games),
    create: game =>
      axios.post("/api/games", { game }).then(res => res.data.game),
    fetchOne: game =>
      axios.post("/api/games/get", { game }).then(res => res.data.game)
  }
};
