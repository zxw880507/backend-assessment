const findByTags = (json, filters) => {
  let data = { ...json };
  console.log(filters);
  const { optionalTags, sortBy, direction } = filters;
  optionalTags.forEach((tag) => {
    data.posts = data.posts.filter((ele) => ele.tags.includes(tag));
  });
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


module.exports = { findByTags, validCheck };
