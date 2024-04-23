import { toDataURL } from 'qrcode'

import { UOB_BILLER_ID } from './constants'

export const generateUOBQRCodePayload = (cardNumber: string) => {
  return `|${UOB_BILLER_ID}\n${cardNumber}\n\n0\n`
}

export const generateQRCode = (payload: string) => {
  return toDataURL(payload, {
    margin: 0,
    type: 'image/jpeg',
    width: 1024,
  })
}
