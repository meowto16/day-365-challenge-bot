import 'node-vk-bot-api'

import { getRandomArrayElement } from '../utils/getRandomArrayElement'

const checkLohCommand: VkBotMiddleware = async (ctx) => {
  const { profiles } = await ctx.bot.execute('messages.getConversationMembers', {
    peer_id: ctx.message.peer_id,
    group_id: process.env.VK_GROUP_ID,
  })

  const randomProfile = getRandomArrayElement(profiles)
  ctx.reply(`Лох: @${randomProfile.screen_name}`)
}

export default checkLohCommand