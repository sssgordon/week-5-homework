const Sequelize = require("sequelize");
const databaseUrl = "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseUrl);

//Model
const Movie = db.define("movie", {
  title: Sequelize.TEXT,
  yearOfRelease: Sequelize.INTEGER.UNSIGNED,
  synopsis: Sequelize.TEXT
});

db.sync({ force: false })
  .then(() => console.log("Database connected"))
  .then(() =>
    Promise.all([
      Movie.create({
        title: "Her",
        yearOfRelease: 2013,
        synopsis:
          "Theodore Twombly (Joaquin Phoenix), a man who develops a relationship with Samantha (Scarlett Johansson), an artificially intelligent virtual assistant personified through a female voice."
      }),
      Movie.create({
        title: "Hausu",
        yearOfRelease: 1977,
        synopsis:
          "A schoolgirl travels with her six classmates to her ailing aunt's country home, where they come face to face with supernatural events as the girls are, one by one, devoured by the home."
      }),
      Movie.create({
        title: "Blade Runner 2049",
        yearOfRelease: 2017,
        synopsis:
          "K, a Nexus-9 replicant 'blade runner' who uncovers a secret that threatens to destabilize society and the course of civilization."
      })
    ])
  )
  .catch(console.error);

module.exports = db;
