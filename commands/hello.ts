import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import admin from 'firebase-admin'
import { DateTime } from 'luxon'
import xlsx from 'xlsx'

const sak = {
  type: 'service_account',
  project_id: 'regresoaclasesuanl',
  private_key_id: 'ea3b5eeb307ec42551bd2ff499f4db5ece4c3eb5',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDP9+Zy3dDrmd7S\nM3p3H8LWVtwS2pP0JTgDeWuCXI/hpvoaMkVRqhRp94SXSxBYDFIAM8lZnOsuqmHS\np/wOgdw8N978ABtlquD2cxU1CPVvGjrXZN1IA78tKqmquRlKwkaQInxKk8ptFDVd\nRReh+5VjljGu4kARtfeBufsrkyqFs8NH+AuNSmlV3gL6o3kKdBv38r38GBxVW/KV\nXGFzIQhbn3KhrSpSVKonONosHrWQ2den6mELqCBHSyMFdw32Qhrv90WxClx6YLIO\nJgbvDBuvpVmIdy38X6+yTBMooaITeBvoc5AslpjPMaVpERY2KcuwyheOX4W4dd+R\naxIjGAk7AgMBAAECggEATT3AnMcf8nF63c163cWxItSt9l6ydwpfzIKLWKayVdgj\nqhkjv9oQrO7ekyaxElK5HhQd46exfeqQXKJBrs2yk7cYnbYYduFJnp9NsB38smAm\nnJt8yGOD3O2siJko+KhBdwUn7rcHhw3raBHiXipH6O3+0/p6W1mfbNI7pIqLT46x\ncmDwl+8gB9vVOcBEkn3gcRuL98hGw3VwQsnbhkARLcpWDFMrwZKEWff3WbEMej91\nCr0bGWVft0LQRWxXUg6+Uj9VaAjmq03Yhez371KBr6qyPHNQGCrzm1YgbCweJDhw\nGwGB33QcoHasCZtevzSCwLa/r1laChYlRHeXKPMEiQKBgQD+TY++27n3uoShWCgE\nySgbDnmcfX7p7OllxWtWkxn34zD+GdPUY2aaDMDocTXqCehsAmGWX7ymigWbC309\nNYAdLxYlbKsLv+zSUWWtiOHGCntJDv7Sq5MLn4hk4BOfZx0UmUMoL9+DHnhs/7rV\ncoLZXPx09KjDcHtjrOIYlhYDdwKBgQDRWy7VbfOvTRTRkvFu3Lyk0sGNPXkfxjTb\n4OIzCg8K2xEzWTE00TdDfvp4ZXlCCu9d2I/6Bn/yN9V5lh5oWBxR3B9m+HdZr9XY\nBSLlrMYAAxRGDuoNg7veSH09KCqeiP2UWe5mvGxpWU/HodotbXM+ixut6nxiWU8U\ns6GkQskxXQKBgQCnJsoWNI0PJR0qhCyBwMrIxgHvd5mlHuDm0RXVqQkHo+C/FLDk\nyJVXKozd/BPpCqwn2oTUd4cjnFNE7w9Z3UGhbSLMZJolNfju4SvJHdDxAFC6281p\nIfecSzc2vwaG3xsBQCAhWR48LBoR4yGmTQdu4izanzoShGvGP4u5h2VezwKBgQCh\n4uVrKnOVqYAgsoS42j2RIluCkPd5Z3X2VIX1O6D4Hv/E+gI/ukwGiEi8EpNaS0Rf\nCBgFGUOUlDIhq8BlpUR41EMAB7+afYpZWVdrzFbrKXZi2iOIQcZjEyCsysNyBbI4\nJfZgQPF/4Qz87J3eJNVJlp3XtQtrrW2mL2UdtHsJDQKBgDMseEoL36KXGLOH52cJ\nIlwhsxv/h8Z7Zak/os8oDBRCeZbuN5/51jNsi7QT1AwXtVGYjXkg8Hpmr+7op1S7\nGwinzJ/N//eTv4dJSTgu3f035S+XQ9LH0qgP2DLPDsgzkYKXd4BWWmRB+tYBxe1f\nNzZkq/bxVvxwvGT1t2CsRrSp\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-gy4t3@regresoaclasesuanl.iam.gserviceaccount.com',
  client_id: '118360694971309092929',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gy4t3%40regresoaclasesuanl.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
}

export default class Hello extends BaseCommand {
  static commandName = 'hello'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    console.log(admin)
    const app = admin.initializeApp({
      // @ts-ignore
      credential: admin.credential.cert(sak),
    })
    const db = app.firestore()
    const accessesSS = await db
      .collectionGroup('accesses')
      .where('created_at', '>', DateTime.now().minus({ day: 14 }).toJSDate())
      .get()
    console.log(accessesSS.docs[0])
    const sheet = xlsx.utils.aoa_to_sheet(
      accessesSS.docs.map((doc) => [
        doc.ref.parent.parent?.id,
        doc.data().student.name,
        doc.data().student.email,
      ])
    )
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, sheet, 'Accesos')
    xlsx.writeFile(wb, 'hello.xlsx')
    this.logger.info('Hello world from "Hello"')
  }
}
