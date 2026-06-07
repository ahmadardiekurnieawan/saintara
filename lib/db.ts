import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

export const assessments = sqliteTable('assessments', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  name: text('name').notNull(),
  birthDate: text('birth_date').notNull(),
  bloodType: text('blood_type').notNull(),
  characterType: text('character_type').notNull(),
  intelligenceScores: text('intelligence_scores').notNull(),
  strengths: text('strengths').notNull(),
  weaknesses: text('weaknesses').notNull(),
  careerPaths: text('career_paths').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
})

let db: ReturnType<typeof drizzle> | null = null

export function getDb() {
  if (!db) {
    try {
      const sqlite = new Database('./saintara.db')
      db = drizzle(sqlite)
      sqlite.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS assessments (
          id TEXT PRIMARY KEY, user_id TEXT, name TEXT NOT NULL,
          birth_date TEXT NOT NULL, blood_type TEXT NOT NULL,
          character_type TEXT NOT NULL, intelligence_scores TEXT NOT NULL,
          strengths TEXT NOT NULL, weaknesses TEXT NOT NULL,
          career_paths TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `)
    } catch (e) { console.error('DB init error:', e) }
  }
  return db
}
