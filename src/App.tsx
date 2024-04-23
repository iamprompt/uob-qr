import { InputMask } from '@react-input/mask'
import { number } from 'card-validator'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { CITIxUOBLogo } from './components/Icons'
import { generateQRCode, generateUOBQRCodePayload } from './helpers'

function App() {
  const [cardNumber, setCardNumber] = useState<string>('')
  const [qrCodeURL, setQRCodeURL] = useState<string | null>(null)

  const creditCardValidator = useMemo(() => number(cardNumber), [cardNumber])

  useEffect(() => {
    if (creditCardValidator.isValid) {
      setQRCodeURL(null)
    }
  }, [creditCardValidator])

  const handleGenerateQRCode = useCallback(async () => {
    if (!creditCardValidator.isValid) {
      return
    }

    const payload = generateUOBQRCodePayload(cardNumber)
    const qrCode = await generateQRCode(payload)

    setQRCodeURL(qrCode)
  }, [creditCardValidator, cardNumber])

  return (
    <div className="from-[#056dae] to-[#255BE3] bg-gradient-to-r min-h-dvh text-white flex flex-col items-center p-6 pt-10">
      <div className="bg-white text-black box-border border-[#005EB8] border-[16px] rounded-3xl py-8 px-6 max-w-xl w-full">
        <div>
          <CITIxUOBLogo className="h-20 w-full mx-auto" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center mt-4 leading-10">
            สร้าง QR Code จ่ายบิล
            <br /> สำหรับบัตรเครดิต Citi และ UOB
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <InputMask
            mask="#### #### #### ####"
            placeholder="หมายเลขบัตรเครดิต"
            className="w-full max-w-60 h-12 mt-8 px-4 py-2 rounded-lg text-black border-[#005EB8] focus-visible:outline-[#005EB8] text-center"
            replacement={{ '#': /[0-9]/ }}
            inputMode="numeric"
            onMask={(e) => {
              setCardNumber(e.detail.input)
            }}
          />
          <button
            disabled={!creditCardValidator.isValid}
            className="bg-[#005EB8] disabled:bg-gray-300 font-bold cursor-pointer disabled:cursor-not-allowed text-white w-full max-w-60 h-12 mt-4 px-4 py-2 rounded-lg text-black border-[#005EB8] focus-visible:outline-[#005EB8] text-center"
            onClick={handleGenerateQRCode}
          >
            สร้าง QR Code
          </button>
        </div>

        {qrCodeURL && creditCardValidator.isValid && (
          <div className="mt-10 space-y-6">
            <div className="font-bold text-center text-3xl">
              สแกน QR Code เพื่อชำระบิล
            </div>
            <div>
              <img
                src={qrCodeURL}
                alt="UOB Bill Payment QR Code"
                className="mx-auto max-w-48 max-h-48"
              />
            </div>
            <div className="text-center">
              <a
                href={qrCodeURL}
                download={`UOB_Bill_Payment_${cardNumber}.jpg`}
                className="text-[#005EB8] underline"
              >
                ดาวน์โหลด QR Code
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
