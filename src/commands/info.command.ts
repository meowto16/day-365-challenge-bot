import 'node-vk-bot-api'

const infoCommand: VkBotMiddleware = (ctx) => {
  ctx.reply(`
      Проект "365 дней кодинга (фистинга)" создан для ежедневных CUMмитов.
      Кто пропускает хотя бы один день - покупает каждому участнику пиццу.

      Сайт челленджа: ${process.env.CHALLENGE_SITE}
      Github челленджа: ${process.env.CHALLENGE_GITHUB}
      Навыки для алисы: (в будущем)
    `)
}

export default infoCommand