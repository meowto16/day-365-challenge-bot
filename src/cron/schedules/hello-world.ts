import Scheduler from '../Scheduler'
import { SCHEDULES } from '../constants'
import Logger from '../../logger'
import { CronStatuses } from '../cron-statuses'

const schedule = SCHEDULES.HELLO_WORLD
const scheduler = new Scheduler(schedule.name)

scheduler.exec(async ({ bot }) => {
  const response = await bot.execute('messages.send', {
    message: `Hello world from schedule. Current time: ${new Date().toLocaleTimeString()}`,
    random_id: schedule.id,
    peer_id: process.env.VK_PEER_ID,
    group_id: process.env.VK_GROUP_ID,
  })
}).finally(() => process.exit(CronStatuses.UNKNOWN_ERROR))