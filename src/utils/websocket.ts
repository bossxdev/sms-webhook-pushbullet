import { WebSocket } from 'ws'
import Deposit from '../services/deposit'
import Withdraw from '../services/withdraw'
import { logger } from './logger'
import { Data } from '../types/data'
import config from '../config/config'

const { ACCESS_TOKEN } = config

const connect = () => {
    const ws = new WebSocket(
        `wss://stream.pushbullet.com/websocket/${ACCESS_TOKEN}`
    )

    ws.on('open', () => {
        logger.info('Connected')
    })

    ws.on('close', () => {
        logger.info('Disconnected')
        setTimeout(function () {
            connect()
        }, 1000)
    })

    ws.on('error', (err) => {
        logger.error(
            'Socket encountered error: ',
            err.message,
            'Closing socket'
        )
        ws.close()
    })

    ws.on('message', async (data: Data) => {
        try {
            const reason = data.toString()
            const sms = JSON.parse(reason)

            if (sms.type === 'push') {
                const smsBody = sms.push.notifications

                Object.keys(smsBody || {}).forEach((key) => {
                    if (
                        smsBody[key].title === 'KBank' ||
                        smsBody[key].title === '027777777'
                    ) {
                        logger.info('\n')
                        console.table(smsBody)
                        logger.info(
                            `Incoming push message: ${JSON.stringify(smsBody)}`
                        )

                        if (smsBody[key].body.includes('รับโอนจาก')) {
                            Deposit(smsBody[key])
                        } else {
                            Withdraw(smsBody[key])
                        }
                    }
                })
            }
        } catch (error) {
            logger.error('Error: ' + error)
            throw error
        }
    })
}

connect()

export default connect
