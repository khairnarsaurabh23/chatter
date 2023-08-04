const sequelize = require('../utils/database')
const GroupMessage = sequelize.models.groupMessage;

async function addMessage(groupId, message, userId) {
  await GroupMessage.create({
    message: message,
    userId: userId,
    groupId: groupId,
  });
  return;
}

module.exports = { addMessage }; // Export as an object with the function as a property
