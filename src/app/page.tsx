"use client";

import { useState } from "react";
import Terminal from "@/components/Terminal";
import BootLoader from "@/components/BootLoader";
import Image from "next/image";

export default function HomePage() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootLoader onFinish={() => setBooted(true)} />}

      {booted && (
        <main className="h-screen w-screen bg-black text-green-500 font-mono flex items-center justify-center">
          <div className="w-11/12 h-5/6 border border-gray-600 rounded-2xl flex overflow-hidden shadow-lg">

            {/* Left Panel: Binary Mr. Robot Mask */}
            <div className="w-1/3 bg-black flex items-center justify-center border-r border-gray-700 p-4 overflow-auto">
              <Image
                src="/hacker_img.png"
                alt="Hacker illustration"
                width={300}
                height={300}
                draggable={false}
                onContextMenu={e => e.preventDefault()}
              />
            </div>

            {/* Right Panel: Terminal Interface */}
            <div className="w-2/3 bg-black p-4 overflow-y-auto">
              <Terminal />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
