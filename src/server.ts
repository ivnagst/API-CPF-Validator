import app from './app';
const port = 3030;

app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});
