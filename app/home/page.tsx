import Link from 'next/link'
import React from 'react'

export default function HomePage() {
  return (
    <aside className='h-full w-52 bg-slate-100 '>
      <Link href={'/home/projects'} className='h-2 w-full bg-white'>
        Proyectos
      </Link>
    </aside>
  )
}
