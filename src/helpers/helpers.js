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
      return `sortBy=${sortBy}&direction=${direction}`;
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
  let arr = data.map((each, index) => {
    return index ? each.posts.map((ele) => ele.id) : each;
  });

  return arr.reduce((a, b) => {
    const copyA = { ...a };
    copyA.posts = copyA.posts.filter((ele) => b.includes(ele.id));
    return copyA;
  });
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
