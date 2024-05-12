import { utilService } from "./util-service";
import { httpService } from "./http.service.js";

export const userService = {
  login,
  logout,
  signup,
  getById,
  update,
  getLoggedinUser,
};

window.userService = userService;

async function login(userCred) {
  const user = await httpService.post("auth/login", userCred);
  if (user) return _saveLocalUser(user);
}

async function signup(userCred) {
  const gender = Math.random() > 0.5 ? "men" : "women";
  userCred.imgUrl = `https://randomuser.me/api/portraits/${gender}/${utilService.getRandomIntInclusive(
    0,
    100
  )}.jpg`;
  const user = await httpService.post("auth/signup", userCred);
  return _saveLocalUser(user);
}

async function logout() {
  sessionStorage.clear();
  return await httpService.post("auth/logout");
}

async function update(user) {
  const updatedUser = await httpService.put(`user/${user._id}`, user);
  if (getLoggedinUser()._id === updatedUser._id) _saveLocalUser(updatedUser);
  return updatedUser;
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem("loggedinUser") || "null");
}

function getById(userId) {
  console.log("getById: ", userId);
  return httpService.get(`user/${userId}`);
}

function _saveLocalUser(user) {
  sessionStorage.setItem("loggedinUser", JSON.stringify(user));
  return user;
}
