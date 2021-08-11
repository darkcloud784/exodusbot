// This event executes when a new member joins a server. Let's welcome them!

const { Message, GuildMemberRoleManager } = require("discord.js");
client.logger = require("./modules/Logger");

module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);
  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.cache.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);

 // if (settings.newUserRolesEnabled !== "true") return;

  const memberAdd = settings.newUserMessage.replace("{{user}}", member.user.tag);

  let filter = m => m.author.id == message.author.id

  member.send(memberAdd).then(() => {
    message.channel.awaitMessage(filter, {
      max: 1,
      time: 3000,
      errors: ['time']
    })
    .then(message => {
      message = message.first();
      if (message.content.toUpperCase() == 'YES' || message.content.toUpperCase() == 'Y' || message.content.toUpperCase() == 'YEP') {
        message.channel.send(`Thanks! I have put you in the members role. You should now be able to see the appropriate channels!`)
        var membersRole = member.guild.roles.find(role => role.name === "Members");
        message.member.addRole(membersRole);
      } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N' || message.content.toUpperCase() == 'NOPE') {
        message.channel.send(`Thanks! I have put you in the Guests role. You should now be able to see the appropriate channels!`)
        var membersRole = member.guild.roles.find(role => role.name === "Guests");
        message.member.addRole(guestRole);
      }
    })
    .catch(collected =>{
      message.channel.send("Sorry something happened and I didn't understand. Please ping Druidness and let him know!");
      client.logger.log(`Something went wrong with adding server roles.`, "log");
    })
  })
};