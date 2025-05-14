'use client';
import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Image from 'next/image';
import { Link, Button } from '@heroui/react';

function Headers() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const MenuList = [
        { name: 'Home', path: "/" },
        { name: 'Explore', path: "/Start_game" },
        { name: 'Contact us', path: "/Contact_us" },
    ];

    return (
        <Navbar className="flex flex-wrap shadow-md py-2 md:py-4 px-3 md:px-6" maxWidth="full">
            <NavbarContent justify="start" className="flex-grow-0">
                <NavbarBrand className="flex items-center">
                    <Image src="/logo.svg" alt="logo" width={32} height={32} className="md:w-10 md:h-10" />
                    <h2 className="font-bold text-xl md:text-3xl text-primary ml-2 md:ml-4">Gyani</h2>
                </NavbarBrand>
            </NavbarContent>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-gray-600 hover:text-gray-900"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Desktop Menu */}
            <NavbarContent justify="center" className="hidden md:flex space-x-4 md:space-x-6 flex-grow justify-center">
                {MenuList.map((item, index) => (
                    <NavbarItem className='text-base md:text-xl text-blue-400 font-medium hover:underline' key={index}>
                        <Link href={item.path} className="text-base md:text-lg font-semibold hover:text-primary transition-colors">
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            {/* Mobile Menu */}
            <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden w-full flex-col items-center mt-4 space-y-4`}>
                {MenuList.map((item, index) => (
                    <Link 
                        key={index}
                        href={item.path} 
                        className="text-base text-blue-400 font-medium hover:underline hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <NavbarContent justify="end" className="flex-grow-0">
                <Button color="default" className="px-3 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                    <Link href="/Start_game">
                    Let's Play
                    </Link>
                </Button>
            </NavbarContent>
        </Navbar>
    );
}

export default Headers;
