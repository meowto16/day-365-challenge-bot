import Request from '../Request'
import { AxiosPromise, AxiosResponse } from 'axios'

type ChallengerInfo = {
  github: string;
  vk: string;

  info: {
    name: string;
    avatar: string;
    specialization: string;
    socials: {
      vk: string;
      github: string;
    }
  }

  stats: {
    currentStreak: string;
    contributionsPerDay: string;
    daysMissed: string;
    totalContributes: string;
  }
}

type CheckContributesTodayResponse = {
  contributed: ChallengerInfo[],
  notContributed: ChallengerInfo[]
}

export class Challenger {
  static checkContributesToday(): AxiosPromise<CheckContributesTodayResponse> {
    return Request.get('/challenger/check-contributes-today')
  }
}