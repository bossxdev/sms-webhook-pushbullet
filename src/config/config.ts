const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid('production', 'development', 'test')
            .required(),
        BASE_API: Joi.string().required(),
        ACCESS_TOKEN: Joi.string().required(),
        ENCRYPT_IV: Joi.string().required(),
        ENCRYPT_KEY: Joi.string().required(),
        API_KEY: Joi.string().required(),
        BANK_DEPOSIT: Joi.string().required(),
        BANK_WITHDRAW: Joi.string().required(),
    })
    .unknown()

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export default {
    BASE_API: envVars.BASE_API,
    ACCESS_TOKEN: envVars.ACCESS_TOKEN,
    ENCRYPT_IV: envVars.ENCRYPT_IV,
    ENCRYPT_KEY: envVars.ENCRYPT_KEY,
    API_KEY: envVars.API_KEY,
    BANK_DEPOSIT: envVars.BANK_DEPOSIT,
    BANK_WITHDRAW: envVars.BANK_WITHDRAW,
}
