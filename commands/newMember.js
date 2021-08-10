const { codeBlock } = require("@discordjs/builders");

exports.run = async (client, message, [action, key, ...value], level) => { 

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
      var membersRole = message.guild.roles.find("name", "Members");
      message.member.addRole(membersRole);
    } else if (message.content.toUpperCase() == 'NO' || message.content.toUpperCase() == 'N' || message.content.toUpperCase() == 'NOPE') {
      message.channel.send(`Thanks! I have put you in the Guests role. You should now be able to see the appropriate channels!`)
      var guestRole = message.guild.roles.find("name", "Guests");
      message.member.addRole(guestRole);
    }
  })
  .catch(collected =>{
    message.channel.send("Sorry something happened and I didn't understand. Please ping Druidness and let him know!");
  })
})
};