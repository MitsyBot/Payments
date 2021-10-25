const { Router } = require('express')
const router = Router()

const PicPayCreate = require('./routes/PicPayCreate')
const CreatePayment = require('./routes/CreatePayment')
const PicPayHook = require('./routes/hooks/PicPayHook')
const isAuthorized = require('./middlewares/isAuth')

router.post('/createPicpayPayment', isAuthorized, PicPayCreate.sendInfos)

router.post('/registerpayment', isAuthorized, CreatePayment.registerPayment)
router.get('/getpayment/:uuid', isAuthorized, CreatePayment.getPayment)
router.post('/hooks/picpay', PicPayHook.picpayHook)

module.exports = router
