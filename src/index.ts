import 'dotenv/config'

import express from 'express'
import VkBot from 'node-vk-bot-api'
import bodyParser from 'body-parser'

import Logger from './logger'

import initializeCommands from './commands'

const app = express()

const bot = new VkBot({
  token: process.env.VK_MESSAGES_API_KEY,
  group_id: +process.env.VK_GROUP_ID,
  confirmation: process.env.VK_MESSAGES_CONFIRMATION,
})

app.use(bodyParser.json())

app.post('/', bot.webhookCallback)

app.post('/schedule', (req, res) => {
  
})

app.listen(process.env.PORT || 8080, () => {
  Logger.success(`BOT started on port: ${process.env.PORT}`)
  initializeCommands(bot)
})