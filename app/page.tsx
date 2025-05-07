import Head from "next/head";
import Image from "next/image";
import Headers from "./_components/Headers";
import Hero from "./_components/Hero";


export default function Home() {
  return (
    <div className="bg-[#d5d7f5]">
      {/* <header></header> */}
      {/* <Headers/> */}
        {/* {Hero} */}
        <Hero/>
    </div>
  );
}
