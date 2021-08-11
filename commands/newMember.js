
exports.run = async (client, member, args, level) => {

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
      var guestRole = member.guild.roles.find(role => role.name === "Guests");
      message.member.addRole(guestRole);
    }
  })
  .catch(collected =>{
    message.channel.send("Sorry something happened and I didn't understand. Please ping Druidness and let him know!");
  })
})
};