import 'node-vk-bot-api'

import { getRandomArrayElement } from '../utils/getRandomArrayElement'

const ukraineCommand: VkBotMiddleware = (ctx) => {
  const from = 2158
  const to = 2181

  const ukraineStickers = [...Array(to - from + 1).keys()].map(k => k + from)
  const randomSticker = getRandomArrayElement(ukraineStickers)
  ctx.reply('', [], null, randomSticker)
}

export default ukraineCommand