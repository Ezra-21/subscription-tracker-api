import nodemailer from 'nodemailer';

import { EMAIL_PASSWORD } from './env.js'

// TODO: Replace with your own Gmail address
export const accountEmail = 'your-email@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD
  }
})

export default transporter;