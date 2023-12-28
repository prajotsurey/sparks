import styles from './styles.module.css'
import { usePresence } from "framer-motion";
import gsap from "gsap-trial";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const prevPos = {
  x: 0,
  y: 0,
};

const currPos = {
  x: 0,
  y: 0,
};

const vel = {
  x: 0,
  y: 0,
};

const updatePositionAndCalculateVelocity = (e) => {
  currPos.x = e.clientX;
  currPos.y = e.clientY;
  vel.x = currPos.x - prevPos.x;
  vel.y = currPos.y - prevPos.y;
  prevPos.x = currPos.x;
  prevPos.y = currPos.y;
};

const rotation = (vX, vY) => {
  switch (true) {
    case vX < 0:
      if (vY < 0) return 180;
      else if (vY > 0) return 90;
      else return 180;
    case vX > 0:
      if (vY < 0) return -90;
      else if (vY > 0) return 0;
      else return -90;
    default:
      return 0;
  }
};

let index = 0;
let counter = 0;

const Sparkles = () => {
  const [isPresent, safeToRemove] = usePresence();
  const lineList = useRef(null)
  const boxList = useRef(null)
  const screen = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const createAndRunLineAnimation = (index, x, y, percentage, rotation) => {
      var tl = gsap.timeline();
      const item  =lineList.current.children[index] 
      tl.to(item, {
        x,
        y,
        rotation: rotation,
        duration: 0,
        scale: 1,
      });
      const tl2 = gsap.timeline();
      tl2.to(item.firstElementChild, { drawSVG: "0%", duration: 0 });
      tl2.to(item.firstElementChild, {
        drawSVG: `0% ${percentage}%`,
        duration: 0.5,
      });
      tl2.to(item.firstElementChild, {
        drawSVG: `${percentage}% ${percentage}%`,
        duration: 0.5,
      });
    };

    const createAndRunBoxAnimation = (index, x1, y1, x2, y2) => {
      const item = boxList.current.children[index]
      gsap.to(item, {
        ease: "power1.out",
        keyframes: [
          { x: x1, y: y1, duration: 0 },
          {
            x: x2,
            y: y2,
            duration: 1,
          },
        ],
      });

      var tl = gsap.timeline();
      tl.to(item, { scale: 0, opacity: 0, duration: 0 });
      tl.to(item, {
        scale: Math.min(1, Math.random() * 2),
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
      tl.to(item, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    };

    const onMouseMove =  (e) => {
      console.log(router.pathname)
      if(lineList.current && boxList.current) {
        updatePositionAndCalculateVelocity(e);
        if (Math.abs(vel.x) > 5 || Math.abs(vel.y) > 5) {
          // run animation once every 5 mouse moves with x or y velocity greater than 5
          if (counter > 3) {
            counter = 0;
            const percentage = Math.min(100, Math.abs(vel.x) + Math.abs(vel.y));
            const r = rotation(vel.x, vel.y);
            createAndRunLineAnimation(index, currPos.x, currPos.y, percentage, r);
            const randomIncreaseFactor = Math.random() * 20;
            createAndRunBoxAnimation(
              index,
              currPos.x,
              currPos.y,
              currPos.x +
                Math.min(vel.x * randomIncreaseFactor, window.innerWidth / 2),
              currPos.y +
                Math.min(vel.y * randomIncreaseFactor, window.innerHeight / 2)
            );
            if (index + 1 === 20) {
              index = 0;
            } else {
              index += 1;
            }
          }
          counter += 1;
        }
      }
    }

    window.addEventListener("mousemove",onMouseMove );
    window.addEventListener("touchmove",onMouseMove );

    if (!isPresent) {

      [...lineList.current.children].forEach((_,index) => {
        createAndRunLineAnimation(index,
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          Math.random() * 100,
          0);
      });
      
      [...boxList.current.children].forEach((_,index) => {
        const rX = Math.random()*window.innerWidth
        const rY = Math.random()* window.innerHeight
        createAndRunBoxAnimation(
          index,
          rX,
          rY,
          rX + Math.random()*window.innerWidth /2,
          rY +  + Math.random()*window.innerHeight /2
        );
      })

      gsap.to(screen.current, { backgroundColor: "#fffaf1", opacity: 0, duration: 0 });
      gsap.to(screen.current, {
        backgroundColor: "#fffaf1",
        opacity: 1,
        duration: 0.5,
      });
      
      setTimeout(() => {
        safeToRemove();
      }, 1000);

      
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onMouseMove)
    };

  }, [isPresent]);

  return (
    <div className={styles.screen} ref={screen}>
      <div ref={lineList}>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      <svg
        className={styles.line}
        width="231"
        height="231"
        viewBox="0 0 231 231"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.707107"
          y1="1.29289"
          x2="229.707"
          y2="230.293"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      </div>
      <div ref={boxList}>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
      </div>

    </div>
  );
};

export default Sparkles;
