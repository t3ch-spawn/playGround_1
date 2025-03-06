import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";
import pic_1 from "../assets/pic_1.png";
import pic_2 from "../assets/pic_2.png";
import pic_3 from "../assets/pic_3.png";
import pic_4 from "../assets/pic_4.png";
import pic_5 from "../assets/pic_5.png";
import Lenis from "lenis";

export default function ZoomTextAnim() {
  const loaderTimeline = useRef(null);
  const pictures = [pic_1, pic_2, pic_3, pic_4, pic_5];

  useGSAP(() => {
    const { innerHeight } = window;
    const lenis = new Lenis({
      duration: 0.8,
    });

    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    gsap.registerPlugin(ScrollTrigger);

    const split = new SplitType(".split", { types: "words,chars" });

    const allImages = document.querySelectorAll(".zoom-images");
    const allTextContainers = document.querySelectorAll(".text-container");

    loaderTimeline.current = gsap.timeline();
    // gsap.to("ss", {
    //   //   ease: "p",
    // });

    const splitNames = document.querySelectorAll(".split-name .char");

    splitNames.forEach((char) => {
      gsap.set(char, { y: 100 });
    });

    // Animation for animating the text in and zooming them out
    for (let i = 0; i < 2; i++) {
      const container = allTextContainers[i];
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
            onStart: () => {
              if (i > 0) {
                gsap
                  .timeline()
                  .to(".images-container", {
                    overflow: "visible",
                    delay: 0.5,
                  })
                  .to(
                    ".img-container",
                    {
                      //   display: "block",
                      scale: 1,
                      transformOrigin: "center",
                      duration: 1.5,
                      ease: "power2.inOut",
                      onStart: () => {
                        gsap.to(".zoom-images", {
                          opacity: 1,
                          duration: 0,
                        });
                      },
                    },
                    "<"
                  );
              }
            },
          },
          ">"
        );
    }

    const allHeights = document.querySelectorAll(".white-height");

    allImages.forEach((pic, idx) => {
      gsap.to(pic, {
        scale: 1.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: allHeights[idx],

          scrub: 2,
          end: "bottom bottom",
          start: "-250% top",
        },
      });
    });

    // gsap
    //   .timeline({ scrollTrigger: { trigger: ".images-container" } })
    //   .to(".img-container", {
    //     scale: 10,
    //     ease: "power2.inOut",
    //     stagger: 2,
    //   });

    // allContainers.forEach((container) => {
    //   gsap.to(container.querySelector("img"), {
    //     scale: 100,
    //     duration: 10,
    //     opacity: 0,
    //     ease: "power2.inOut",
    //     scrollTrigger: {
    //       trigger: container,
    //       end: `+=${innerHeight * 2}px`,
    //       scrub: 2,
    //       pin: true,
    //       markers: true,
    //     },
    //   });
    // });
  });

  return (
    <section className="">
      {/* <div className="text-container">
        <div className="text-zoom">
    
        </div>
      </div>
      <div className="text-container">
    
      </div> */}

      {/* Loader container */}
      <div className="h-[100vh] fixed inset-0 w-[100vw] flex justify-center items-center text-[48px] overflow-hidden">
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

      <div className=" relative images-container overflow-hidden h-[100vh] ">
        <div className=" flex justify-center items-center fixed w-[100vw] h-[100vh] inset-0 overflow-hidden">
          {pictures.map((pic, idx) => {
            return (
              <div
                className="fixed h-[100vh] w-[100vw] flex justify-center scale-0 items-center img-container"
                style={{ zIndex: idx + 4 }}
              >
                <img
                  src={pic}
                  className="zoom-images scale-0 opacity-0"
                  alt=""
                />
              </div>
            );
          })}
        </div>

        <div
          style={{ height: `${innerHeight * 3}px` }}
          className="w-[100%]"
        ></div>
        {pictures.map((pic, idx) => {
          return (
            <div
              style={{ height: `${innerHeight * 2.5}px` }}
              className=" w-[100%] white-height"
            ></div>
          );
        })}
      </div>
    </section>
  );
}
