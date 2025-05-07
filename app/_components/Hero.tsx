"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  return (
    <div className="px-10 md:px-28 lg:px-44 mt-10 h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-[70px] text-primary font-extrabold py-10">
            Let's think of something, and I will guess it for you.
          </h2>
          <Link href="/Start_game">
            <Button
              color="success"
              variant="bordered"
              className="font-extrabold text-2xl px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
        <div>
          <Image src={"/gynai_image.jpg"} alt="Gyani_image" width={500} height={1000} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
