import { z } from 'zod'

// 登入 Schema
export const loginSchema = z.object({
  account: z
    .string({ required_error: '請輸入帳號' })
    .min(1, '請輸入帳號')
    .max(10, '帳號最多 10 個字元'),
  password: z
    .string({ required_error: '請輸入密碼' })
    .min(4, '密碼至少需要 4 個字元')
    .max(10, '密碼最多 10 個字元'),
})

// 導出 TypeScript 類型
export type LoginFormData = z.infer<typeof loginSchema>