const prisma = require("../database");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.json(movies);
};

const addMovie = async (req, res) => {
  const { title, genre, year } = req.body;

  try {
    const movie = await prisma.movie.create({
      data: { title, genre, year: Number(year) },
    });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: "Erro ao adicionar filme" });
  }
};

const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, genre, year } = req.body;

  try {
    const movie = await prisma.movie.update({
      where: { id },
      data: { title, genre, year: Number(year) },
    });

    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar filme" });
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.movie.delete({ where: { id } });
    res.json({ message: "Filme deletado" });
  } catch (error) {
    res.status(400).json({ error: "Erro ao deletar filme" });
  }
};

module.exports = { getMovies, addMovie, updateMovie, deleteMovie };
