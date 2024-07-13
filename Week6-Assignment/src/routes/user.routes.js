import {Router} from "express"
import { createUser, deleteUser, readUser, updateUser} from "../controllers/user.controller.js";

const router = Router();

router.route("/create")
    .post(createUser)

router.route("/read/:userId")
    .get(readUser)

router.route("/update/:userId")
    .patch(updateUser)

router.route("/delete/:userId")
    .delete(deleteUser)


export default router