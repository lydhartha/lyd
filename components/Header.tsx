import React from 'react'

export default function Header() {
    return (
        <div className="bg-blue-500 text-white p-4 flex flex-col
    md:flex-row items-center justify-between">
            <h1 className="text-2xl font-bold">GAGO GAGO Header</h1>
            <ul className="flex space-x-4 mt-2">
                <li>
                    <a href="/" className="hover:underline">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/products" className="hover:underline">
                        Products
                    </a>
                </li>
                <li>
                    <a href="/about" className="hover:underline">
                        About
                    </a>
                </li>
                <li>
                    <a href="/contact" className="hover:underline">
                        Contact
                    </a>
                </li>
            </ul>
        </div>
    )
}
