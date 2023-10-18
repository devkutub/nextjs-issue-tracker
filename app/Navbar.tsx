import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai"

const Navbar = () => {
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ];

    return (
        <nav className='flex space-x-8 border-b px-4 h-14 items-center mb-4'>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-8'>
                {links.map((d) => (
                    <li key={d.href}><Link href={d.href} className='text-zinc-500 hover:text-zinc-800 transition-colors'>{d.label}</Link></li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar