const router = require("express").Router();
const axios = require("axios");
const {
  sortByOption,
  validCheck,
  mergeTagResult,
} = require("../../helpers/helpers");

router.get("/", (request, response) => {
  console.log(request.query);
  const { tags, sortBy, direction } = request.query;

  if (tags) {
    const tagsArr = tags.split(",");
    const optionalTags = tagsArr.slice(1);
    const result = validCheck(sortBy, direction);
    if (result.msg) {
      response.status(404).json(result.msg);
    } else {
      if (!sortBy || !direction) {
        response.redirect(`posts?tags=${tags}&${result}`);
      } else {
        const promiseArr = tagsArr.map((tag) =>
          axios
            .get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`)
            .then((res) => res.data)
        );

        Promise.all(promiseArr).then((values) => {
          const filters = { sortBy, direction };
          const resultByTags = mergeTagResult(values);
          const optionalSort = sortByOption(resultByTags, filters);
          response.status(200).json(optionalSort);
        });

        //   axios
        //     .get(
        //       `https://api.hatchways.io/assessment/blog/posts?tag=${tagsArr[0]}`
        //     )
        //     .then((res) => {
        //       const filters = { optionalTags, sortBy, direction };
        //       const data = findByTags(res.data, filters);
        //       response.status(200).json(data);
        //     })
        //     .catch((err) => console.log(err));
      }
    }
  } else {
    response.status(404).json({ error: "Tags parameter is required" });
  }
  // console.log(req.url);
  // axios
  //   .get("https://api.hatchways.io/assessment/blog/posts?")
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // console.log(req.query);
  // console.log("tags:", tags);
  // console.log("sortBy:", sortBy);
  // console.log("direction:", direction);
  // res.json("hahahahahahah");
});

module.exports = router;
