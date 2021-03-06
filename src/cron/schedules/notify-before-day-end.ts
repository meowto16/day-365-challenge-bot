import Scheduler from '../Scheduler'
import { SCHEDULES } from '../constants'
import { CronStatuses } from '../enum/cron-statuses.enum'
import { Challenger } from '../../services/api/endpoints/Challenger'
import Logger from '../../logger'
import { randomId } from '../../utils/randomId'

const schedule = SCHEDULES.NOTIFY_BEFORE_DAY_END
const scheduler = new Scheduler(schedule.name)

scheduler.exec(async ({ bot }) => {
  const { data: { notContributed } } = await Challenger.checkContributesToday().catch((err) => {
    Logger.error('Error while trying to fetch challengers contributes stats', err)
    process.exit(CronStatuses.VK_FETCH_CHECK_TODAY_CONTRIBUTES_ERROR)
  })
  Logger.success('Got contributed and not contributed challengers')

  if (notContributed.length === 0) {
    Logger.success('All challengers contributed today')
    process.exit(CronStatuses.SUCCESS)
  }

  const notContributedVkIds = notContributed.map(challenger => challenger.vk).join(' ')

  await bot.execute('messages.send', {
    message: `
    Осталось 2 часа до конца дня.
    Не закоммитили: ${notContributedVkIds}`,
    random_id: randomId(),
    peer_id: process.env.VK_PEER_ID,
    group_id: process.env.VK_GROUP_ID,
  })
    .then(() => {
      Logger.success('Successfully notified challengers')
      process.exit(CronStatuses.SUCCESS)
    })
    .catch((err) => {
      Logger.error('Error while notifying challengers', err)
      process.exit(CronStatuses.VK_BOT_SEND_MESSAGE_ERROR)
    })
}).finally(() => process.exit(CronStatuses.UNKNOWN_ERROR))