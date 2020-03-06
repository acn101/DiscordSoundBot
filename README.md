# DiscordSoundBot
Plays an mp3 file from a directory based on the file name using Node and FFMPEG

1. Open a command line of your choosing (Terminal, GitBash, etc...) and run npm install
2. Replace {discord-api} in .env with your Discord bot's token.
3. Add your mp3 files to the 'sounds' directory.
4. Invite your bot to a Discord server of your choosing.
5. Done!

Type 'cmd in a discord message channel that your bot has access to for a list of commands (only stop and leave should show up if you didn't add sounds to your sounds directory!

Note: This bot uses FFMPEG (https://www.ffmpeg.org/download.html) so you will need to download it and add it to your PATH!