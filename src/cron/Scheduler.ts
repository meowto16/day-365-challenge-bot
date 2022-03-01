import 'dotenv/config'

import VkBot from 'node-vk-bot-api'
import Logger from '../logger'
import { CronStatuses } from './cron-statuses'

export type SchedulerWork = (props: {
  bot: VkBot
}) => Promise<void>

class Scheduler {
  name: string

  bot = new VkBot({
    token: process.env.VK_MESSAGES_API_KEY,
    group_id: +process.env.VK_GROUP_ID,
    confirmation: process.env.VK_MESSAGES_CONFIRMATION,
  })
  
  constructor(name: string) {
    this.name = name

    this.start()
  }
    
  async exec(callback: SchedulerWork) {
    Logger.info(`Running schedule ${this.name}`)
    try {
      await callback({
        bot: this.bot
      })

      this.stop()
    } catch (err) {
      this.stop(err)
    }
  }

  private start() {
    Logger.success(`Schedule ${this.name} started`)

    this.bot.startPolling((err) => {
      if (err) {
        Logger.error(`Polling error for schedule ${this.name}`, err)
        process.exit(CronStatuses.VK_BOT_POLLING_ERROR)
      } else {
        Logger.success(`Started polling for schedule ${this.name}`)
      }

      return {}
    })
  }

  private stop(err = null) {
    this.bot.stop()

    if (err) {
      Logger.error(`Schedule ${this.name} failed`, err)
      process.exit(CronStatuses.VK_TASK_EXEC_ERROR)
    } else {
      Logger.success(`Schedule ${this.name} succeed`)
      process.exit(CronStatuses.SUCCESS)
    }
  }
}

export default Scheduler