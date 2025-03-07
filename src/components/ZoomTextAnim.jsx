import React, { useRef, useState } from "react";
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
  const { innerHeight, innerWidth } = window;
  const [scaleValue, setScaleValue] = useState(2);

  useGSAP(() => {
    const lenis = new Lenis({
      duration: 0.8,
    });

    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });

    gsap.registerPlugin(ScrollTrigger);

    const split = new SplitType(".split", { types: "words,chars" });

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
            // duration: 0.2,
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
            // duration: 0.2,
            ease: "power4.inOut",
            onStart: () => {
              if (i > 0) {
                const cont = document.querySelector(".images-container");
                // cont.classList.add("active");
                const body = document.querySelector("body");
                body.classList.remove("active");

                gsap.timeline().to(
                  ".img-container",
                  {
                    //   display: "block",
                    scale: 1,
                    delay: 1,
                    transformOrigin: "center",
                    duration: 1.5,
                    ease: "power2.inOut",
                    onStart: () => {
                      gsap.to(".zoom-images", {
                        opacity: 1,
                        duration: 0,
                      });
                    },
                    onComplete: () => {
                      gsap.to(".home-screen", {
                        opacity: 1,
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

    gsap.matchMedia().add("(max-width: 800px)", () => {
      setScaleValue(2.7);
    });
  });

  useGSAP(() => {
    const allImages = document.querySelectorAll(".zoom-images");

    const allHeights = document.querySelectorAll(".white-height");

    allImages.forEach((pic, idx) => {
      gsap.to(pic, {
        scale: scaleValue,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: allHeights[idx],
          scrub: 2,
          end: "bottom bottom",
          start: idx === 0 ? "-150% bottom" : "-60% bottom",
        },
      });
    });

    const revealHome = gsap.timeline().to(".img-container", {
      yPercent: -190,
    });

    // Animation to reveal home screen
    ScrollTrigger.create({
      trigger: ".home-controller",
      scrub: 1,
      animation: revealHome,
      start: "top bottom",
      end: "top top",
      markers: true,
    });
  }, [scaleValue]);

  return (
    <>
      {" "}
      <section className="">
        {/* <div className="text-container">
    <div className="text-zoom">

    </div>
  </div>
  <div className="text-container">

  </div> */}

        {/* <div>
    {pictures.map((pic) => (
      <img className="z-[20000]" src={pic} />
    ))}
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

        <div className=" relative images-container w-[100%]  h-[100vh]">
          {pictures.map((pic, idx) => {
            return (
              <div
                className="fixed h-[100vh] w-[100%] flex justify-center scale-0 items-center img-container"
                style={{ zIndex: idx + 40 }}
              >
                <img
                  src={pic}
                  className="zoom-images scale-0 h-[912px] w-[912px]   object-cover opacity-0 relative"
                  style={{ zIndex: idx + 40 }}
                  alt=""
                />
              </div>
            );
          })}

          {/* White space Heights to control the picture animation */}
          {pictures.map((pic, idx) => {
            return (
              <div
                style={{ height: `${innerHeight * 2.8}px` }}
                className=" w-[100%] white-height"
              ></div>
            );
          })}

          <div
            className=" w-[100%] home-controller bg-[transparent] relative "
            style={{ height: `${innerHeight * 1.3}px` }}
          ></div>

          <div className="h-[100vh]  z-[4] fixed inset-0 opacity-0 bg-red-600 w-[100%] home-screen ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            dicta, adipisci culpa ratione in nam, sed ut, blanditiis voluptas ea
            et. Ipsum reprehenderit minima repudiandae delectus accusantium
            quidem, ad velit. Culpa, veritatis quaerat. Mollitia neque quia id
            magnam praesentium facilis esse, eos velit eum voluptates alias
            veniam, blanditiis dolore reiciendis magni. Doloribus similique quod
            et cupiditate nam aspernatur quisquam mollitia! Laboriosam nesciunt
            numquam nobis pariatur beatae enim suscipit explicabo minima in sed
            cupiditate repellendus, voluptatibus voluptatem maiores neque ab
            cumque blanditiis voluptates nihil illo harum vitae? Molestias optio
            cumque labore. Impedit, pariatur libero, velit fugit consectetur
            facilis, quibusdam neque ipsa debitis placeat totam qui
            necessitatibus esse sequi error! Architecto optio in impedit fugit
            nobis, ab quisquam rerum deserunt nulla veritatis? A culpa
            voluptatem, et reiciendis sint, dolor fugiat, quibusdam tempora in
            distinctio nisi hic quia facilis impedit dolorum sunt sequi iusto
            laborum voluptatum repudiandae dicta magnam assumenda laudantium
            minus. Itaque. Rerum hic eius possimus a inventore officia velit
            neque ratione repellendus recusandae! Provident architecto quia
            natus dignissimos cum, aperiam quo, laboriosam minima sunt
            consequatur deserunt magni impedit adipisci commodi suscipit?
            Similique repellat doloremque impedit sunt, atque reprehenderit
            consequatur corporis odio ipsam iure? Voluptates veritatis odit odio
            facere dolorem perferendis eum earum unde ex dicta tempore itaque,
            corporis labore ipsam laboriosam? Quas dolore laudantium saepe
            commodi quisquam modi totam rem veniam laboriosam repudiandae
          </div>
        </div>
      </section>
    </>
  );
}
