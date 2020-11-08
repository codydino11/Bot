const Discord = require('discord.js');
const config = require('./config');
const SnakeGame = require('./snake-game');
const HangmanGame = require('./hangman-game-copy-2.js');
const MinesweeperGame = require('./minesweeper');
const Connect4 = require('./connect4');
const Chess = require('./chess');
const express = require('express');

const client = new Discord.Client(["MANAGE_MESSAGES"]);

const snakeGame = new SnakeGame(client);
const hangman = new HangmanGame(client);
const minesweeper = new MinesweeperGame(client);
const connect4 = new Connect4(client);
const chess = new Chess(client);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.channel.name.includes("bot_land")) {
        if (msg.content.toLowerCase() === 'v.snake') {
            snakeGame.newGame(msg);
        }
        else if (msg.content.toLowerCase() === 'v.hangman') {
            hangman.newGame(msg);
        }
        else if (msg.content.toLowerCase() === 'v.connect4') {
            connect4.newGame(msg);
        }
        else if (msg.content.toLowerCase() === 'v.minesweeper') {
            minesweeper.newGame(msg);
        }
        else if (msg.content.toLowerCase() === 'v.chess') {
            chess.newGame(msg);
        }
        else if (msg.content.toLowerCase() === 'v.help') {
            const embed = new Discord.MessageEmbed()
                .setColor('#fc2eff')
                .setTitle('Help - Commands')
                .setDescription("v.snake - Сыграть в змейку\nv.hangman - Play Hangman\nv.connect4 - Play Connect4\nv.minesweeper - Play Minesweeper\nv.chess - Play Chess")
                .setTimestamp();
            msg.channel.send(embed);
        }
    }
});

client.login(config.token);

const app = express()
const port = 3030

app.get('/', (req, res) => {
    res.send('<script>window.close();</script>');
    if (req.query.col && req.query.row) {
        minesweeper.makeMove(parseInt(req.query.col), parseInt(req.query.row));
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})