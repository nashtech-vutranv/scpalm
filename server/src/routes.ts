import { Request, Response, Router } from "express"

const healthRouter = Router()

healthRouter.get('/healthCheck', (req: Request, res: Response) => {
    res.status(200).send('Online!')
})

export { healthRouter }