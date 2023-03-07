declare namespace IOST {
  class HTTPProvider {
    constructor(host: string, timeout?: number)

    send: (
      method: 'get' | 'post',
      url: string,
      data: string
    ) => Promise<Response>
  }

  type Response = import('axios').AxiosResponse
}
