const router = require("express").Router();
const axios = require("axios");
const array = require("lodash/array");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

const {
  sortByOption,
  validCheck,
  mergeTagResult,
  getCache,
} = require("../../helpers/helpers");

router.get("/", (request, response) => {
  const { tags, sortBy, direction } = request.query;

  if (tags) {
    const tagsArr = tags.split(",");
    const result = validCheck(sortBy, direction);
    if (result.msg) {
      response.status(404).json(result.msg);
    } else {
      if (!sortBy || !direction) {
        response.redirect(`posts?tags=${tags}&${result}`);
      } else {
        const promiseArr = tagsArr.map((tag) => {
          if (myCache.has(tag)) {
            return getCache(myCache, tag).then((data) => {
              return data;
            });
          } else {
            return axios
              .get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`)
              .then((res) => {
                myCache.set(tag, res.data);
                return res.data;
              });
          }
        });

        Promise.all(promiseArr).then((values) => {
          const filters = { sortBy, direction };
          const mergeValues = mergeTagResult(values);
          const optionalSort = sortByOption(mergeValues, filters);
          response.status(200).json(optionalSort);
        });
      }
    }
  } else {
    response.status(404).json({ error: "Tags parameter is required" });
  }
});

module.exports = router;
