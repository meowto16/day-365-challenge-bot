import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import VkBot from 'node-vk-bot-api'

import { getRandomArrayElement } from "./utils/getRandomArrayElement";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.PORT || 8080);

  const bot = new VkBot({
    token: process.env.VK_MESSAGES_API_KEY,
    group_id: +process.env.VK_GROUP_ID,
    confirmation: process.env.VK_MESSAGES_CONFIRMATION,
  });

  bot.command('/help', (ctx) => {
    ctx.reply(`
      Список команд
    
      О проекте:
      - /author - узнать, кто меня написал
      - /info - узнать информацию о проекте
      - /rules - узнать правила проекта
      
      Для споров:
      - /check-loh - выяснит, кто лох

      Рандом:
      - /ukraine - рандомный стикер в поддержку Украины
    `)
  })

  bot.command('/author', (ctx) => {
    ctx.reply(`Меня написал ${process.env.VK_AUTHOR_SCREEN_NAME}`);
  })

  bot.command('/info', (ctx) => {
    ctx.reply(`
      Проект "365 дней кодинга (фистинга)" создан для ежедневных CUMмитов.
      Кто пропускает хотя бы один день - покупает каждому участнику пиццу.

      Сайт челленджа: ${process.env.CHALLENGE_SITE}
      Github челленджа: ${process.env.CHALLENGE_GITHUB}
    `)
  })

  bot.command('/rules', (ctx) => {
    ctx.reply(`
      Правила:
    
      - Необходимо коммитить каждый день
      - Нужен хотя бы 1 коммит в день, без разницы какой, хоть на 1 строку изменений
      - Челлендж для вас оканчивается, когда вы получаете в приложении ачивку за 365 дней подряд

      Кто пропускает хотя бы один день, на следующий день заказывает каждому участнику по одной пицце
    `)
  })

  bot.command('/check-loh', async (ctx) => {
    const { profiles } = await bot.execute('messages.getConversationMembers', {
      peer_id: ctx.message.peer_id,
      group_id: process.env.VK_GROUP_ID,
    })

    const randomProfile = getRandomArrayElement(profiles)
    ctx.reply(`Лох: @${randomProfile.screen_name}`)
  })

  bot.command('/ukraine', (ctx) => {
    const from = 2158
    const to = 2181

    const ukraineStickers = [...Array(to - from + 1).keys()].map(k => k + from)
    const randomSticker = getRandomArrayElement(ukraineStickers)
    ctx.reply('', [], null, randomSticker)
  })
}

bootstrap();
