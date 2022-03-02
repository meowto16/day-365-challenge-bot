import Scheduler from '../Scheduler'
import { SCHEDULES } from '../constants'
import { CronStatuses } from '../enum/cron-statuses.enum'

const schedule = SCHEDULES.HELLO_WORLD
const scheduler = new Scheduler(schedule.name)

scheduler.exec(async ({ bot }) => {
  await bot.execute('messages.send', {
    message: `Hello world from schedule. Current time: ${new Date().toLocaleTimeString()}`,
    random_id: Date.now(),
    peer_id: process.env.VK_PEER_ID,
    group_id: process.env.VK_GROUP_ID,
  })
}).finally(() => process.exit(CronStatuses.UNKNOWN_ERROR))