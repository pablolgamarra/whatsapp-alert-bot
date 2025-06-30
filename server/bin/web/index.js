import app from 'src/web/index.js';

app.listen(3000, (error) => {
	if (error) {
		console.log(`Error initializing web server ${error}`);
	}
	console.log('Server listening on port 3000');
});
