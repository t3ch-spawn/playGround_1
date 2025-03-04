import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function ZImbabwe() {
  const [count, setCount] = useState(0);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const allMoveCircles = document.querySelectorAll(".move-circle");
    let circleTrans = [
      { top: "10%", left: "45%" },
      { top: "10%", left: "50%" },
      { top: "10%", left: "45%" },
      { top: "10%", left: "50%" },
    ];

    let finalCoords = [
      { top: "-30px", left: "70%" },
      { top: "-30px", left: "30%" },
      { top: "300px", left: "65%" },
      { top: "450px", left: "40%" },
    ];

    allMoveCircles.forEach((circle, idx) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".circles-container",
            // markers: true,
            scrub: 1,
            start: "top 40%",
            end: "80% 40%",
          },
        })
        .to(circle, {
          top: circleTrans[idx].top,
          left: circleTrans[idx].left,
          opacity: 1,
        })
        .to(circle, {
          top: finalCoords[idx].top,
          left: finalCoords[idx].left,
          opacity: 0.3,
        });
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".circles-container",
          // markers: true,
          scrub: 1,
          start: "top 40%",
          end: "bottom 40%",
        },
      })
      .to(".big-circle", {
        scale: 0.6,
      })
      .to(".big-circle", {
        scale: 1,
      });
  });

  return (
    <main className="min-h-[400vh]">
      <div className="h-[150vh] mt-[300px] flex justify-center items-center circles-container sticky top-[200px]">
        <div className="h-[300px] w-[300px] rounded-full absolute top-0 left-[40%] bg-red-600 big-circle z-[20]"></div>

        <div className="mid-circle bg-[#006400] top-[-30px] z-[25] left-[70%] move-circle opacity-[0.3]"></div>
        <div className="small-circle bg-[#FFD300] top-[-30px] right-[70%] move-circle opacity-[0.3]"></div>
        <div className="mid-circle bg-[#D50000] top-[300px] left-[65%] move-circle opacity-[0.3]"></div>
        <div className="small-circle bg-black top-[450px] z-[25] right-[60%] move-circle opacity-[0.3]"></div>
      </div>
    </main>
  );
}
