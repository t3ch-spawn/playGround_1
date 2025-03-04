import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

export default function ZoomTextAnim() {
  const loaderTimeline = useRef(null);

  useGSAP(() => {
    const { innerHeight } = window;

    gsap.registerPlugin(ScrollTrigger);

    const split = new SplitType(".split", { types: "words,chars" });

    const allContainers = document.querySelectorAll(".img-container");
    const allTextContainers = document.querySelectorAll(".text-container");

    loaderTimeline.current = gsap.timeline();
    // gsap.to("ss", {
    //   //   ease: "p",
    // });

    const splitNames = document.querySelectorAll(".split-name .char");
    const descrip = document.querySelector(".split-descrip");

    splitNames.forEach((char) => {
      gsap.set(char, { y: 100 });
    });

    for (let i = 0; i < 2; i++) {
      const container = allTextContainers[i];
      console.log(container);
      loaderTimeline.current
        .to(
          i > 0
            ? document.querySelector(".split-descrip")
            : container.querySelectorAll(".char"),
          {
            y: 0,
            duration: 1.7,
            scale: 1,
            ease: "power2.inOut",
            opacity: 1, 
          },
          i > 0 ? ">-75%" : ""
        )
        .to(
          container,
          {
            scale: 800,
            duration: 3.5,
            ease: "power4.inOut",
          },
          ">"
        );
    }

    // allContainers.forEach((container) => {
    //   gsap.to(container.querySelector(".text-zoom"), {
    //     scale: 100,
    //     duration: 10,
    //     opacity: 0,
    //     ease: "power2.inOut",
    //     scrollTrigger: {
    //       trigger: container,
    //       end: `+=${innerHeight * 1.4}px`,
    //       scrub: 2,
    //       pin: true,
    //       markers: true,
    //     },
    //   });
    // });
  });

  return (
    <section className="overflow-hidden">
      {/* <div className="text-container">
        <div className="text-zoom">
    
        </div>
      </div>
      <div className="text-container">
    
      </div> */}

      {/* Loader container */}
      <div className="h-[100vh] absolute inset-0 w-[100vw] flex justify-center items-center text-[48px] overflow-hidden">
        <div className="text-container absolute overflow-hidden">
          {" "}
          <p className="leading-[100%] split split-name">Williams</p>
          <p className="ml-[100px] leading-[100%] split split-name">Alamu</p>
        </div>
        <div className="text-container absolute  overflow-hidden">
          <p className="text-zoom scale-[0.2] opacity-0 split-descrip mb-[10px] split">
            a creative visual designer
          </p>
        </div>
      </div>
    </section>
  );
}
