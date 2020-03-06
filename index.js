const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

let fs = require('fs');
// Read files from the sounds directory
let files = fs.readdirSync('./sounds/');
// Empty array to hold the sounds later
let sounds = [];

// Set the volume here
// Default volume: .2
let volume = .2;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // Set the bot's activity to "playing type 'cmd"
  client.user.setActivity('type \'cmd', { type: 'PLAYING' });

  files.forEach(file => {
    // Slice off .mp3
    file = file.slice(0,-4);
    // Push the file name to sounds array
    sounds.push(file);
  });
});

client.on('message', msg => {
  try {
    // Check if it's a custom command ('join, 'leave, 'stop)
    main(msg);

    // Slice off the apostrophe and check if it's in the array of sounds
    if (sounds.includes(msg.content.slice(1))) {
      // Play it!
      play(msg, msg.content.slice(1), volume);
    }
  } catch(error) {
    // Print out any errors to the console
    console.log(error);
  }
});

/**
 * Some main functions that need to manually be coded
 */
function main(msg) {
  // Check if user types 'leave
  if (msg.content === '\'leave') {
    // Check if the user is in the same voice channel
    if (msg.member.voice.channel) {
      // Make the bot leave
      msg.member.voice.channel.leave();
      // Delete the user's message
      msg.delete();
    }
  } else if (msg.content === '\'stop') {
    // Play nothing
    play(msg, '', volume);
  } else if (msg.content === '\'cmd') {
    // Run the commands method
    commands(msg);
  }
}

/**
 * Simply display the list of commands
 */
function commands(msg) {
  // Takes the array list of songs from sounds variable and displays them nicely along with leave and stop commands
  msg.reply("\nMy commands are: `\'" + sounds.join('` `\'') + '` `\'leave` `\'stop`')
    .then(message => {
      setTimeout(() => {
        // Delete both the sender and the bot's message after 2 minutes
        msg.delete();
        message.delete();
      }, 120000);
    });
}

/** 
 * Play function takes in the message, the name of the song, and the volume.
*/
function play(msg, songName, volume) {
  // Make sure the user is in a channel
  if (msg.member.voice.channel) {
    // Join that channel
    msg.member.voice.channel.join()
      .then(connection => {
        // Play the specified song based on the songName (currently only plays mp3s)
        connection.play('./sounds/' + songName + '.mp3');
        // Then set the volume of that playback
        connection.dispatcher.setVolume(volume);
      })
      .finally(() => {
        setTimeout(() => {
          // Delete the message of the user after 3 seconds
          // This is mostly used to prevent spamming chat
          msg.delete();
        }, 3000);
      });
  }
}

// Create a .env file and add the following line:
// TOKEN={your-token}
client.login(process.env.TOKEN);