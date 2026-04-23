// Must be set before any https calls
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local manually (tsx doesn't load it automatically)
try {
  const envFile = readFileSync(resolve(__dirname, '../.env.local'), 'utf-8')
  for (const line of envFile.split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
} catch {}

import { projects } from '../data/projects'
import { skills } from '../data/skills'
import { experiences } from '../data/experience'
import { education } from '../data/education'
import { rawAchievements } from '../data/achievements'
import { blogPosts } from '../src/data/blog-posts'

// Uses service role key to bypass RLS for seeding — never expose this client-side
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function seed() {
  console.log('Seeding portfolio data...')

  // Projects
  const { error: projErr } = await supabase.from('portfolio_projects').upsert(
    projects.map((p, i) => ({
      title: p.title,
      description: p.description,
      technologies: p.technologies,
      image: p.image ?? null,
      github: p.github ?? null,
      demo: p.demo ?? null,
      overview: p.overview ?? null,
      features: p.features ?? [],
      technical_details: p.technicalDetails ?? null,
      challenges: p.challenges ?? [],
      solutions: p.solutions ?? [],
      role: p.role ?? null,
      duration: p.duration ?? null,
      team_size: p.teamSize ?? null,
      sort_order: i,
    })),
    { onConflict: 'title' }
  )
  if (projErr) console.error('Projects error:', projErr.message)
  else console.log(`✓ Projects (${projects.length})`)

  // Skill categories + skills
  for (let i = 0; i < skills.length; i++) {
    const cat = skills[i]
    const { data: catData, error: catErr } = await supabase
      .from('portfolio_skill_categories')
      .upsert({ category: cat.category, sort_order: i }, { onConflict: 'category' })
      .select('id')
      .single()
    if (catErr) { console.error('Skill category error:', catErr.message); continue }

    const { error: skillErr } = await supabase.from('portfolio_skills').upsert(
      cat.items.map((item, j) => ({
        category_id: catData.id,
        name: item.name,
        level: item.level,
        experience: item.experience,
        sort_order: j,
      })),
      { onConflict: 'category_id,name' }
    )
    if (skillErr) console.error('Skills error:', skillErr.message)
  }
  console.log(`✓ Skills (${skills.reduce((a, c) => a + c.items.length, 0)} items in ${skills.length} categories)`)

  // Experience
  const { error: expErr } = await supabase.from('portfolio_experience').upsert(
    experiences.map((e, i) => ({
      role: e.role,
      company: e.company,
      period: e.period,
      location: e.location ?? null,
      summary: e.summary ?? null,
      highlights: e.highlights ?? [],
      stack: e.stack ?? [],
      sort_order: i,
    })),
    { onConflict: 'company,period' }
  )
  if (expErr) console.error('Experience error:', expErr.message)
  else console.log(`✓ Experience (${experiences.length})`)

  // Education
  const { error: eduErr } = await supabase.from('portfolio_education').upsert(
    education.map((e, i) => ({
      period: e.period,
      title: e.title,
      institution: e.institution,
      description: e.description ?? null,
      sort_order: i,
    })),
    { onConflict: 'title,institution' }
  )
  if (eduErr) console.error('Education error:', eduErr.message)
  else console.log(`✓ Education (${education.length})`)

  // Achievements
  const { error: achErr } = await supabase.from('portfolio_achievements').upsert(
    rawAchievements.map((a, i) => ({
      title: a.title,
      issuer: a.issuer,
      date: a.date,
      type: a.type,
      description: a.description ?? null,
      image: a.image ?? null,
      link: (a as any).link ?? null,
      sort_order: i,
    })),
    { onConflict: 'title,issuer' }
  )
  if (achErr) console.error('Achievements error:', achErr.message)
  else console.log(`✓ Achievements (${rawAchievements.length})`)

  // Blog posts
  const { error: blogErr } = await supabase.from('portfolio_blog_posts').upsert(
    blogPosts.map((p, i) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      date: p.date,
      read_time: p.readTime,
      category: p.category,
      tags: p.tags,
      image: p.image,
      author: p.author,
      featured: p.featured,
      published: true,
      sort_order: i,
    })),
    { onConflict: 'slug' }
  )
  if (blogErr) console.error('Blog posts error:', blogErr.message)
  else console.log(`✓ Blog posts (${blogPosts.length})`)

  console.log('\nDone!')
}

seed().catch(console.error)
