const { Router } = require('express')
const router = Router()

const PicPayCreate = require('./routes/PicPayCreate')
const CreatePayment = require('./routes/CreatePayment')
const PicPayHook = require('./routes/hooks/PicPayHook')

router.post('/createPicpayPayment', PicPayCreate.sendInfos)

router.post('/registerpayment', CreatePayment.registerPayment)
router.get('/getpayment/:uuid', CreatePayment.getPayment)
router.post('/hooks/picpay', PicPayHook.picpayHook)
module.exports = router
