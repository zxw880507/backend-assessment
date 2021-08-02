const sortByOption = (value, filters) => {
  const data = { ...value };

  const { sortBy, direction } = filters;

  switch (direction) {
    case "asc":
      data.posts.sort((a, b) => a[sortBy] - b[sortBy]);
      break;
    case "desc":
      data.posts.sort((a, b) => b[sortBy] - a[sortBy]);
      break;
  }
  return data;
};

const validCheck = (sortBy = "id", direction = "asc") => {
  if (["id", "reads", "likes", "popularity"].includes(sortBy)) {
    if (["asc", "desc"].includes(direction)) {
      return { sortBy, direction };
    } else {
      return {
        msg: {
          error: "direction parameter is invalid",
        },
      };
    }
  } else {
    return {
      msg: {
        error: "sortBy parameter is invalid",
      },
    };
  }
};

const mergeTagResult = (data) => {
  const merged = data.reduce((obj1, obj2) => {
    obj1.posts = obj1.posts.concat(obj2.posts);
    return obj1;
  });

  const newObj = { ...merged };
  newObj.posts = [...new Map(merged.posts.map((x) => [x.id, x])).values()];
  return newObj;
};

const getCache = (myCache, key) => {
  return new Promise((resolve, reject) => {
    if (myCache.has(key)) {
      const data = myCache.get(key);
      resolve(data);
    }
  });
};

module.exports = { sortByOption, validCheck, mergeTagResult, getCache };
