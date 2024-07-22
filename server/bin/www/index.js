const app = require('../../src/app');
require('dotenv').config({ path: 'server/config/server.env' });

app.set('port', process.env.SERVER_PORT || 3000);

app.listen(app.get('port'), () => {
    console.log(`Serving on Port ${app.get('port')}`);
});
