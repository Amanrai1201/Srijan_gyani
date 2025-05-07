import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Image from 'next/image';
// import { Link, Button } from '@heroui/react';
import {Link,Button} from '@heroui/react'

function Headers() {
    const MenuList = [
        { name: 'Home', path: "/page" },
        { name: 'Explore', path: "/explore" },
        { name: 'Contact us', path: "/contact_us" },
    ];

    return (
        <Navbar className="justify-center flex shadow-md py-4 px-6" maxWidth="full">
            <NavbarContent justify="center" className="w-full flex justify-center">
                <NavbarBrand className="flex items-center">
                    <Image src="/logo.svg" alt="logo" width={40} height={40} />
                    <h2 className="font-bold text-3xl text-primary ml-4">Gyani</h2>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent justify="center" className="w-full flex justify-center space-x-6">
                {MenuList.map((item, index) => (
                    <NavbarItem className='text-xl text-blue-400 font-medium hover:underline' key={index}>
                        <Link href={item.path} className="text-lg font-semibold hover:text-primary transition-colors">
                            {item.name}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="center" className="w-full flex justify-center mt-2">
                <Button color="default" className="px-6 py-3 rounded-xl text-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                    Let’s Play
                </Button>
            </NavbarContent>
        </Navbar>
    );
}

export default Headers;
