import { Router} from "express";
import funciones_Users_Controllers from "../controllers/UsersControllers"

const userRouter = Router()

userRouter.get("/", funciones_Users_Controllers.getUsers)

userRouter.get("/:id", funciones_Users_Controllers.getUserById)

userRouter.post("/register", funciones_Users_Controllers.registerUser)

userRouter.post("/login", funciones_Users_Controllers.loginUser)

export default userRouter