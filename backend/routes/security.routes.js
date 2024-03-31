import { Router } from "express";
import func from "../../blockchain/index.js";

const { storeRecord,getOneRecord,getRecords,deleteRecord }=func
const router=Router();

router.post("/store-transaction-records",storeRecord)
router.get("/get-transaction-records",getRecords)
router.get("/get-transaction-record/:id",getOneRecord)
router.delete("/delete-transaction-record/:id",deleteRecord)

export default router