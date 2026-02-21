import type { NextApiRequest, NextApiResponse } from 'next'
// import { signIn } from '@/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, password } = req.body
        // await signIn('credentials', { email, password })
        if (email === "admin@example.com" && password === "admin123") {
        res.status(200).json({ success: true })
        }else{
            res.status(401).json({ error: 'Invalid credentials.' })
        }
    } catch (error) {
        // if (error.type === 'CredentialsSignin') {
        //   res.status(401).json({ error: 'Invalid credentials.' })
        // } else {
        //   res.status(500).json({ error: 'Something went wrong.' })
        // }

        res.status(500).json({ error: 'Something went wrong.' })

    }
}