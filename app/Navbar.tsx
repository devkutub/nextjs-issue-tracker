'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from "react-icons/ai"
import classNames from 'classnames';

const Navbar = () => {
    const pathname = usePathname();
    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues" }
    ];

    return (
        <nav className='flex space-x-8 border-b px-4 h-14 items-center mb-4'>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-8'>
                {links.map((d) => (
                    // <Link key={d.href} href={d.href} className={`${d.href === pathname ? 'text-zinc-900' : 'text-zinc-500'}  hover:text-zinc-800 transition-colors`}>{d.label}</Link>
                    <Link key={d.href} href={d.href} className={classNames({
                        "text-zinc-900": d.href === pathname,
                        "text-zinc-500": d.href !== pathname,
                        "hover:text-zinc-800 transition-colors": true
                    })}>{d.label}</Link>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar