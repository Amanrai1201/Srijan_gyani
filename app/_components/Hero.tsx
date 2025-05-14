"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="px-4 sm:px-10 md:px-28 lg:px-44 mt-4 md:mt-10 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] text-primary font-extrabold py-4 md:py-10 leading-tight">
            Let's think of something, and I will guess it for you.
          </h2>
          <Link href="/Start_game">
            <Button
              color="success"
              variant="bordered"
              className="font-bold sm:font-extrabold text-lg sm:text-xl md:text-2xl px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="flex justify-center md:justify-end mt-6 md:mt-0">
          <Image 
            src={"/gynai_image.jpg"} 
            alt="Gyani_image" 
            width={500} 
            height={1000}
            className="w-full max-w-[300px] md:max-w-[500px] h-auto object-contain" 
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
