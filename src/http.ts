export class Http {
  static HEADERS = {
    'Content-Type': 'application/json'
  }

  static async get(url: string) {
    try {
      return await request(url, 'GET', null)
    } catch (e) {
      throw e
    }
  }

  static async post(url: string, data: any) {
    try {
      return await request(url, 'POST', data)
    } catch (e) {
      throw e
    }
  }

  static async patch(url: string, data: any) {
    try {
      return await request(url, 'PATCH', data)
    } catch (e) {
      throw e
    }
  }

  static async delete(url: string) {
    try {
      return await request(url, 'DELETE', null)
    } catch (e) {
      throw e
    }
  }
}

async function request(url: string, method: string = 'GET', data: any) {
  const config: any = {
    method,
    headers: Http.HEADERS
  }

  if (method === 'POST' || method === 'PATCH') {
    config.body = JSON.stringify(data)
  }

  const response = await fetch(url, config)
  return await response.json()
}