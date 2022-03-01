import VKBot from 'node-vk-bot-api'

import authorCommand from './author.command'
import helpCommand from './help.command'
import infoCommand from './info.command'
import rulesCommand from './rules.command'
import checkLohCommand from './check-loh.command'
import ukraineCommand from './ukraine.command'

import { CommandType } from '../enums'
import Logger from '../logger'

export default function initializeCommands(bot: VKBot) {
  try {
    const commands: Record<CommandType, VkBotMiddleware> = {
      [CommandType.HELP]: helpCommand,
      [CommandType.AUTHOR]: authorCommand,
      [CommandType.INFO]: infoCommand,
      [CommandType.RULES]: rulesCommand,
      [CommandType.CHECK_LOH]: checkLohCommand,
      [CommandType.UKRAINE]: ukraineCommand,
    }

    const entries = Object.entries(commands)

    entries.forEach(([commandType, callback]) => {
      const loggedCallback: VkBotMiddleware = async (ctx) => {
        try {
          await callback(ctx)
          Logger.reply(commandType)
        } catch (err) {
          Logger.error(`Error while trying to reply on "${commandType}"`, err)
        }
      }

      bot.command(commandType, loggedCallback)
    })

    Logger.success('BOT initialized all commands')
  } catch (err) {
    Logger.error('Error while trying to initialize bot commands', err)
  }
}