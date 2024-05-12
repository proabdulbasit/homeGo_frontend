import { httpService } from "./http.service";

export const stayService = {
  query,
  getById,
  remove,
  update,
  add,
  getTopRatedStays,
  getNearbyStays,
  getHostStays,
  getUserWishlist,
};

window.stayService = stayService;

function query(trip) {
  return httpService.get(`stay`, trip);
}

function getById(stayId) {
  return httpService.get(`stay/${stayId}`);
}

function remove(stayId) {
  return httpService.delete(`stay/${stayId}`);
}

async function update(stay) {
  return await httpService.put(`stay/${stay._id}`, stay);
}

async function add(stay) {
  return await httpService.post(`stay`, stay);
}

async function getTopRatedStays(
  trip = {
    loc: { address: "" },
    guests: { adults: 1, kids: 0 },
    type: "top rated",
  }
) {
  return await httpService.get(`stay`, trip);
}

async function getNearbyStays(location) {
  return await httpService.get(`stay`, {
    loc: { address: "" },
    guests: { adults: 1, kids: 0 },
    type: "nearby",
    data: location,
  });
}

async function getHostStays(userId) {
  return await httpService.get(`stay`, {
    loc: { address: "" },
    guests: { adults: 1, kids: 0 },
    type: "host",
    data: userId,
  });
}

async function getUserWishlist(user) {
  return httpService.get(`stay`, {
    loc: { address: "" },
    guests: { adults: 1, kids: 0 },
    type: "wishlist",
    data: user,
  });
}
