import 'node-vk-bot-api'

const authorCommand: VkBotMiddleware = (ctx) => {
  ctx.reply(`Меня написал ${process.env.VK_AUTHOR_SCREEN_NAME}`)
}

export default authorCommand