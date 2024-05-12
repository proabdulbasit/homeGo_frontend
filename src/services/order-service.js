import { tripService } from "../services/trip-service";
import { httpService } from "./http.service";

export const orderService = {
  query,
  remove,
  add,
  update,
  getHostOrders,
  getUserOrders,
};

window.orderService = orderService;

async function query(
  user = { id: null, type: "all", filterBy: { num: 1, name: "" } }
) {
  const orders = await httpService.get(`order`, user);
  return orders;
}

async function add(trip, stay, loggedInUser) {
  const order = {
    createdAt: Date.now(),
    endDate: trip.time.checkOut,
    startDate: trip.time.checkIn,
    guests: trip.guests,
    host: stay.host,
    status: "wait for approval",
    totalPrice: trip.totalPrice,
    user: loggedInUser,
    stay,
  };
  tripService.remove();
  return await httpService.post(`order`, order);
}

async function getHostOrders(userId) {
  var orders = query("order", { id: userId, type: "host" });
  orders = orders.filter((order) => {
    return order.host._id === userId;
  });
  return orders;
}

async function getUserOrders(userId) {
  var orders = query("order", { id: userId, type: "user" });
  orders = orders.filter((order) => {
    return order.host._id === userId;
  });
  return orders;
}

function remove(orderId) {
  return httpService.delete(`order/${orderId}`);
}

async function update(order) {
  return await httpService.put(`order/${order._id}`, order);
}
