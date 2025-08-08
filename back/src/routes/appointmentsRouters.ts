import { Router} from "express";
import funciones_Turns_Controllers from "../controllers/AppointmentsControllers"

const appointmentRouter = Router()

appointmentRouter.get("/",funciones_Turns_Controllers.getAllTurns)

appointmentRouter.get("/:id",funciones_Turns_Controllers.getTurnById)

appointmentRouter.post("/schedule",funciones_Turns_Controllers.createNewTurn)

appointmentRouter.put("/cancel/:id",funciones_Turns_Controllers.cancelledTurn)

export default appointmentRouter
