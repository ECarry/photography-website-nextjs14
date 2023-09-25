/**
 * ## Global Prisma Client ʲˢ
 *
 * 创建一个可复用的 Prisma 数据库连接
 * 以便在整个应用程序中使用
 * 确保在生产环境中将 globalThis.prisma 设置为 db 可以防止在生产环境中创建不必要的额外连接。
 * 有效地管理数据库连接，同时确保代码的可维护性。
 * 
 */

import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
