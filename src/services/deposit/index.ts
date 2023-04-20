import { pushbulletMsg } from '../../api'
import { encrypt } from '../../utils/encrypt'
import { logger } from '../../utils/logger'
import { DataType } from '../../types/data'
import config from '../../config/config'

const { BANK_DEPOSIT } = config

const Deposit = async (data: DataType) => {
    try {
        if (data.body.includes(BANK_DEPOSIT)) {
            await pushbulletMsg(
                encrypt(
                    JSON.stringify(
                        (({ title, body }) => ({
                            title,
                            body,
                        }))(data)
                    )
                )
            ).then((res) => {
                if (!res) {
                    logger.info(
                        'SUCCESS: SMS statement is successfully updated.'
                    )
                    return true
                } else {
                    logger.warn(
                        'FAILED: SMS statement is not successfully updated.'
                    )
                    return false
                }
            })
        }
    } catch (error) {
        logger.error(error)
        return false
    }
}

export default Deposit
