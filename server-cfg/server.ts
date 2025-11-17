// @ts-ignore
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router('data/books.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/create-book', (req, res) => {
  try {
    const books = router.db.get('books').value();
    const lastBook = books[books.length - 1];
    const newBook = {
      ...req.body.book,
      id: lastBook ? lastBook.id + 1 : 1
    };
    router.db.get('books').push(newBook).write();
    res.status(200).json({
      message: "Книга добавлена"
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при создании книги"
    });
  }

});

server.delete('/delete-book/:bookId', (req, res) => {
  const bookId = Number(req.params.bookId);
  try {
    const books = router.db.get('books');
    const bookToDelete = books.find({ id: bookId }).value();
    if (!bookToDelete) {
      return res.status(404).json({
        message: "Книга не найдена"
      });
    }
    router.db.get('books').remove({ id: bookId }).write();
    res.status(200).json({
      message: "Книга успешно удалена"
    });
  } catch (error) {
    res.status(500).json({
      message: "Ошибка при удалении книги",
    });
  }

});

server.patch('/update-status/:bookId/:newStatus', (req, res) => {
  const bookId = Number(req.params.bookId);
  const newStatus = req.params.newStatus;
  try {
    const books = router.db.get('books');
    const book = books.find({ id: bookId }).value();
    if (!book) {
      return res.status(404).json({
        message: "Книга не найдена"
      });
    }
    books.find({ id: bookId }).assign({ status: newStatus }).write();
    res.status(200).json({
      message: "Статус книги успешно обновлен",
    });

  } catch (error) {
    res.status(500).json({
      message: "Ошибка при обновлении статуса",
    });
  }
})

server.use(router);
server.listen(3003, () => {
  console.log('working on port 3003');
});
