
module.exports = io => {
    io.on('connection', socket => {

        let currentCode = null;

        socket.on('move', (move) => {

            io.to(currentCode).emit('newMove', move);
        });
        
        socket.on('joinGame', (data) => {

            currentCode = data.code;
            socket.join(currentCode);
            if (!games[currentCode]) {
                games[currentCode] = true;
                return;
            }
            
            io.to(currentCode).emit('startGame');
        });

        socket.on('disconnect', () => {

            if (currentCode) {
                io.to(currentCode).emit('gameOverDisconnect');
                delete games[currentCode];
            }
        });

    });
};