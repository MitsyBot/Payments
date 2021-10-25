const { Router } = require('express')
const router = Router()

const PicPayCreate = require('./routes/PicPayCreate')
const CreatePayment = require('./routes/CreatePayment')

router.post('/createPicpayPayment', PicPayCreate.sendInfos)

router.post('/registerpayment', CreatePayment.registerPayment)
router.get('/getpayment/:uuid', CreatePayment.getPayment)

module.exports = router
