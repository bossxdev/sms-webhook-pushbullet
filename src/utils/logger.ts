import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import fs from 'fs'
import path from 'path'

const logDir = 'logs'

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const dailyRotateFileTransport = new DailyRotateFile({
    filename: `${logDir}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
})

export const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.label({ label: path.basename(require.main!.filename) }),
        format.printf(
            (info) =>
                `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
        ),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(
                    (info) =>
                        `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
                )
            ),
        }),
        dailyRotateFileTransport,
    ],
})
