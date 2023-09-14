import express from 'express'
import { log } from './utils/logger'
import { zapReportProcessing, zapRouter } from './zap/routes'
import { healthRouter } from './routes'
import cors from 'cors'

const app = express()
app.use(cors())

app.listen(1337, () => {
    log.info(`Application is running on port 1337`)

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/api/health', healthRouter)
    app.use('/api/zap', zapRouter, zapReportProcessing)
})