import EventEmitter from 'events'

const fetchResponse = { ok: true, status: 200, text: jest.fn(() => 'string') }

class SolidAuthClient {
  session: any
  constructor() {
    // super();
    this.session = undefined
  }

  fetch = () => fetchResponse

  popupLogin = () => {}

  logout = () => {}

  trackSession(callback: any) {
    if (this.session !== undefined) callback(this.session)
    // this.on('session', callback);
  }

  mockWebId(webId: string) {
    this.session = webId ? { webId } : null
    // this.emit('session', this.session);
  }
}

const instance = new SolidAuthClient()
jest.spyOn(instance, 'fetch')
jest.spyOn(instance, 'popupLogin')
jest.spyOn(instance, 'logout')
// jest.spyOn(instance, 'removeListener');

export default instance
