import axios, { AxiosInstance } from 'axios'

class Request {
  protected readonly instance: AxiosInstance

  public constructor() {
    this.instance = axios.create({
      baseURL: process.env.API_CHALLENGE,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  public getInstance = () => this.instance
}

export const request = new Request()

export default request.getInstance()
