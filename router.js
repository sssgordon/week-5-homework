const { Router } = require("express");
const { Movie } = require("./sequelize-rest");

const router = new Router();

//Create
router.post("/movies", (req, res, next) => {
  Movie.create(req.body)
    .then(newMovie => res.status(201).send(newMovie))
    .catch(next);
});

//Read
router.get("/movies", (req, res, next) => {
  Movie.findAll()
    .then(movies => res.status(200).send(movies))
    .catch(next);
});

router.get("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) {
        res.status(200).send(movie);
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

//Update
router.put("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) {
        movie
          .update(req.body)
          .then(updatedMovie => res.status(200).send(updatedMovie));
      } else {
        res.status(404).end();
      }
    })
    .catch(next);
});

//Delete
router.delete("/movies/:id", (req, res, next) => {
  Movie.findByPk(req.params.id)
    .then(movie => {
      if (movie) {
        movie
          .destroy()
          .then(() =>
            res.status(200).send({ message: `${movie.title} deleted` })
          );
      } else {
        res.send(404).end();
      }
    })
    .catch(next);
});

module.exports = router;
