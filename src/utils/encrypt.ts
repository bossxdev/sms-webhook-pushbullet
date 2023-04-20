import CryptoJS from 'crypto-js'

import config from '../config/config'

const { ENCRYPT_IV, ENCRYPT_KEY } = config

export const encrypt = (plaintext: string) => {
    const keyWA = CryptoJS.enc.Utf8.parse(ENCRYPT_KEY)
    const ivWA = CryptoJS.enc.Utf8.parse(ENCRYPT_IV)
    const encrypted = CryptoJS.AES.encrypt(plaintext, keyWA, {
        iv: ivWA,
        mode: CryptoJS.mode.CBC,
    })
    return encrypted.toString()
}
