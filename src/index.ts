import App from './app';
import http from 'http';

const port = process.env.PORT || 3000;

http.createServer(new App().app).listen(port, () => {
    console.log(`server listen at *:${port}`)
})