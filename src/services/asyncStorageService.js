export const storageService = {
  query,
  get,
  post,
  put,
  remove,
};

function query(
  entityType,
  trip = {
    guests: { adults: 0, kids: 0 },
    loc: { address: "" },
    time: { checkIn: "", checkOut: "" },
  },
  user = null
) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  if (entityType === "stay") {
    if (user && user._id) {
      entities = _filterByWhishList(entities, user.wishlist);
    } else {
      entities = _filterByTripInfo(entities, trip);
    }
  }
  return Promise.resolve(entities);
}

function _filterByTripInfo(entities, { loc, guests }) {
  const address = loc.address.toUpperCase();
  const capacity = guests.adults + guests.kids;
  var filteredEntities = entities.filter((entitie) => {
    return (
      entitie.loc.address.toUpperCase().includes(address) &&
      capacity <= entitie.capacity
    );
  });
  return filteredEntities;
}

function _filterByWhishList(entities, wishlist) {
  return wishlist.map((entityId) => {
    return entities.find((entitie) => {
      return entitie._id === entityId;
    });
  });
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  );
}

function post(entityType, newEntity) {
  newEntity._id = _makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity) => entity._id === updatedEntity._id
    );
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
