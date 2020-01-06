import { Request, Response, Router } from "express";

import quesCtrl from "../controller/question";
import testCtrl from "../controller/test";

const app = Router();

app
  .route("/question")
  .post(async (req: Request, res: Response) => {
    const { body } = req;
    const resp = await quesCtrl.add(body);
    res.json(resp);
  })
  .get(async (req: Request, res: Response) => {
    console.log("asdaasda")

    const resp = await quesCtrl.all(req.query);
    res.json(resp);
  });

app
  .route("/quiz")
  .post(async (req: Request, res: Response) => {
    const { body } = req;
    const resp = await testCtrl.add(body);
    res.json(resp);
  })
  .get(async (req: Request, res: Response) => {
    const resp = await testCtrl.all(req.query);
    res.json(resp);
  });

app
  .route("/quiz/:_id")
  .get(async (req: Request, res: Response) => {
    const { _id } = req.params;
    const resp = await testCtrl.get(_id);
    res.json(resp);
});


export default app