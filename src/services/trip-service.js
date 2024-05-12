export const tripService = {
  query,
  remove,
  add,
  getTopCities,
};

const STORAGE_KEY = "trip";
window.tripService = tripService;

function query() {
  return load(STORAGE_KEY);
}

function remove() {
  return save(STORAGE_KEY, null);
}

function add(trip) {
  return save(STORAGE_KEY, trip);
}

function getTopCities() {
  const topCities = [
    {
      city: "Hong Kong",
      state: "China",
      imgUrl:
        "https://a0.muscache.com/im/pictures/be4d3ba5-08d7-4afe-95a7-f2da6453886a.jpg?im_q=medq&im_w=240",
    },
    {
      city: "Bangkok",
      state: "Thailand",
      imgUrl:
        "https://a0.muscache.com/im/pictures/7253e011-7c22-48fd-b75d-d0da35372397.jpg?im_q=medq&im_w=240",
    },
    {
      city: "London",
      state: "England",
      imgUrl:
        "https://a0.muscache.com/im/pictures/52e8083e-2de2-446d-a860-534eab250541.jpg?im_q=medq&im_w=240",
    },
    {
      city: "Paris",
      state: "France",
      imgUrl:
        "https://a0.muscache.com/im/pictures/20e74de0-0eb8-4fca-afb8-b111875acdf5.jpg?im_q=medq&im_w=240",
    },
    {
      city: "Dubai",
      state: "United Arab Emirates",
      imgUrl:
        "https://a0.muscache.com/im/pictures/e639b7ab-aee3-48ee-9743-216684a51319.jpg?im_q=medq&im_w=240",
    },
    {
      city: "New York",
      state: "United States",
      imgUrl:
        "https://a0.muscache.com/im/pictures/ca3737ef-0faf-46ba-b055-b4a2d99e2cea.jpg?im_q=medq&im_w=240",
    },
    {
      city: "Amsterdam",
      state: "Netherlands",
      imgUrl:
        "https://a0.muscache.com/im/pictures/585d1e53-e2e1-4baf-a34e-36301dd1e2da.jpg?im_q=medq&im_w=240",
    },
    {
      city: "Tel Aviv",
      state: "Israel",
      imgUrl:
        "https://a0.muscache.com/im/pictures/7c309a70-bc93-4603-8d3b-9d4cd9bf75b2.jpg?im_q=medq&im_w=240",
    },
  ];
  return topCities;
}

// storage service

function load(key) {
  var val = localStorage.getItem(key);
  return val ? JSON.parse(val) : null;
}

function save(key, val) {
  localStorage[key] = JSON.stringify(val);
  return val;
}
