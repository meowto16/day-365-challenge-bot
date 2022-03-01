import 'node-vk-bot-api'

const helpCommand = (ctx) => {
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
}

export default helpCommand