import { pushbulletHttp } from './http'
import * as EndPoints from './endPoints'
import { logger } from '../utils/logger'

export const pushbulletMsg = async (data: string) => {
    try {
        const response: any = await pushbulletHttp.post(
            EndPoints.PUSHBULLET + '/sms/statement',
            {
                data: data,
            }
        )
        return !!(response.status === 200 && response.statusText['OK'])
    } catch (error) {
        logger.error('Error: ' + error)
        throw error
    }
}
