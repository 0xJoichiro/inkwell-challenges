import React, { useState, useEffect, useRef } from 'react';
import { MarqueeMenu } from '@/components/MarqueeMenu';

export const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [isHoveringEnter, setIsHoveringEnter] = useState(false);
  const circleRefs = useRef([]);
  const enterButtonRef = useRef(null);
  const animationStarted = useRef(false);

  useEffect(() => {
    // Simulate font loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!animationStarted.current) {
        animationStarted.current = true;
        startIntroAnimation();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const startIntroAnimation = () => {
    // Start the intro animation
    setTimeout(() => {
      circleRefs.current.forEach((circle, index) => {
        if (circle) {
          circle.style.transform = `scale(1) rotate(${index * 5}deg)`;
          circle.style.opacity = '1';
          circle.style.transition = `all 2.5s cubic-bezier(0.19, 1, 0.22, 1) ${index * 0.1}s`;
        }
      });
      
      if (enterButtonRef.current) {
        enterButtonRef.current.style.opacity = '1';
        enterButtonRef.current.style.transform = 'scale(1)';
        enterButtonRef.current.style.transition = 'all 2.5s cubic-bezier(0.19, 1, 0.22, 1) 0.5s';
      }
    }, 100);
  };

const handleEnter = () => {
  // First animate the circles and button out
  circleRefs.current.forEach((circle, index) => {
    if (circle) {
      const scale = 1.5 + (4 - index) * 0.3;
      circle.style.transform = `scale(${scale}) rotate(${index * 45}deg)`;
      circle.style.opacity = '0';
      circle.style.transition = `all 1.5s cubic-bezier(0.87, 0, 0.13, 1) ${index * 0.05}s`;
    }
  });

  if (enterButtonRef.current) {
    enterButtonRef.current.style.transform = 'scale(0.7)';
    enterButtonRef.current.style.opacity = '0';
    enterButtonRef.current.style.transition = 'all 1.5s cubic-bezier(0.87, 0, 0.13, 1)';
  }

  // Then show the MarqueeMenu after the animation completes
  setTimeout(() => {
    setHasEntered(true);
  }, 1600); // Slightly longer than the 1.5s animation
};

  // Keep track of original rotations for each circle
  const originalRotations = [0, 5, 10, 15]; // Base rotations for each circle

  const handleMouseEnter = () => {
    setIsHoveringEnter(true);
    // Rotate circles to consistent positions on hover
    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        // Use absolute rotation instead of adding to current
        const targetRotation = originalRotations[index] + 180; // Always rotate to same position
        circle.style.transform = `scale(1) rotate(${targetRotation}deg)`;
        circle.style.transition = `transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${-index * 0.075}s`;
      }
    });
  };

  const handleMouseLeave = () => {
    setIsHoveringEnter(false);
    // Reset circles back to their original orientations
    circleRefs.current.forEach((circle, index) => {
      if (circle) {
        const originalRotation = originalRotations[index]; // Always same base position
        circle.style.transform = `scale(1) rotate(${originalRotation}deg)`;
        circle.style.transition = `transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.05}s`;
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#130F21] text-[#E4E4E7] font-sans overflow-hidden relative">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#130F21] flex items-center justify-center">
          <div className="text-[#ffffff] text-xl font-medium animate-pulse">Loading</div>
        </div>
      )}

      <main className="relative min-h-screen">
        {/* Circular Text SVG */}
        <svg
          className="fixed pointer-events-none w-[186vmin] h-[186vmin] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          width="100%"
          height="100%"
          viewBox="0 0 1400 1400"
        >
          <defs>
            <path id="circle-1" d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5" />
            <path id="circle-2" d="M382,700.5A318.5,318.5 0 1 11019,700.5A318.5,318.5 0 1 1382,700.5" />
            <path id="circle-3" d="M487,700.5A213.5,213.5 0 1 1914,700.5A213.5,213.5 0 1 1487,700.5" />
            <path id="circle-4" d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5" />
          </defs>

          <text
            ref={el => circleRefs.current[0] = el}
            className="fill-[#48423c] text-[25vmin] font-thin uppercase origin-center"
            style={{
              fontSize: 'clamp(170px, 25vmin, 180px)',
              fontFamily: 'serif',
              opacity: 0,
              transform: 'scale(0.3) rotate(0deg)',
              transformOrigin: '700px 700px'
            }}
          >
            <textPath href="#circle-1" textLength="2830">
              Exploit Defend Audit Learn&nbsp;
            </textPath>
          </text>

          <text
            ref={el => circleRefs.current[1] = el}
            className="fill-[#48423c] text-[17vmin] font-extralight uppercase origin-center"
            style={{
              fontSize: 'clamp(136px, 17vmin, 153px)',
              fontFamily: 'serif',
              opacity: 0,
              transform: 'scale(0.3) rotate(5deg)',
              transformOrigin: '700px 700px'
            }}
          >
            <textPath href="#circle-2" textLength="2001">
              Reentrancy Capture The Flag&nbsp;
            </textPath>
          </text>

          <text
            ref={el => circleRefs.current[2] = el}
            className="fill-[#48423c] text-[13.5vmin] font-medium uppercase origin-center"
            style={{
              fontSize: 'clamp(110px, 13.5vmin, 120px)',
              fontFamily: 'sans-serif',
              opacity: 0,
              transform: 'scale(0.3) rotate(10deg)',
              transformOrigin: '700px 700px'
            }}
          >
            <textPath href="#circle-3" textLength="1341">
              Break Chain Hack 2 Learn&nbsp;
            </textPath>
          </text>

          <text
            ref={el => circleRefs.current[3] = el}
            className="fill-[#48423c] text-[9.5vmin] font-light uppercase origin-center"
            style={{
              fontSize: 'clamp(85px, 9.5vmin, 94px)',
              fontFamily: 'serif',
              opacity: 0,
              transform: 'scale(0.3) rotate(15deg)',
              transformOrigin: '700px 700px'
            }}
          >
            <textPath href="#circle-4" textLength="836">
              OverTheInk Wargames&nbsp;
            </textPath>
          </text>
        </svg>

        {/* Header Frame */}
        <div
          className="fixed top-0 left-0 w-full h-full p-8 pointer-events-none z-10 opacity-100"
          style={{
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            gridTemplateRows: 'auto auto auto',
            gridTemplateAreas: '"title links" "... ..." "... demos"',
            alignContent: 'space-between'
          }}
        >
          <h1 className="text-base font-medium m-0" style={{ gridArea: 'title' }}>
            {/* OverTheInk */}
          </h1>

          <nav className="flex gap-4 justify-self-end pointer-events-auto" style={{ gridArea: 'links' }}>
            {/* <a href="#" className="text-[#d6af7c] hover:text-white transition-colors duration-200">
              Previous demo
            </a>
            <a href="#" className="text-[#d6af7c] hover:text-white transition-colors duration-200">
              Article
            </a>
            <a href="#" className="text-[#d6af7c] hover:text-white transition-colors duration-200">
              GitHub
            </a> */}
          </nav>

          {/* <nav className="flex gap-4 justify-self-end pointer-events-auto" style={{ gridArea: 'demos' }}>
            <a href="#" className="text-[#a5a5a5]">demo 1</a>
            <a href="#" className="text-[#d6af7c] hover:text-white transition-colors duration-200">demo 2</a>
            <a href="#" className="text-[#d6af7c] hover:text-white transition-colors duration-200">demo 3</a>
          </nav> */}
        </div>

        {/* Main Content */}
        <div
          className={`flex flex-col items-center justify-center min-h-screen px-8 text-center ${
            hasEntered ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000`}
        >
          {hasEntered ? (
            <MarqueeMenu />
          ) : (
            <p className="text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl font-light pointer-events-none">
              We are a creative agency that focuses on human-centric design and ergonomic workplace innovations.
            </p>
          )}
        </div>

        {/* Enter Button */}
        <button
          ref={enterButtonRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full cursor-pointer border-0 font-medium text-[#ffffff] bg-transparent p-0 z-20"
          style={{
            opacity: 0,
            transform: 'scale(0.3)',
            pointerEvents: hasEntered ? 'none' : 'auto'
          }}
          onClick={handleEnter}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          disabled={hasEntered}
        >
          <div
            className="absolute inset-0 rounded-full transition-all duration-800 ease-out"
            style={{
              backgroundColor: isHoveringEnter ? '#2A2342' : '#8F6FFF',
              transform: isHoveringEnter ? 'scale(1.2)' : 'scale(1)',
              opacity: 1
            }}
          />
          <span className="relative z-10 font-medium">Enter</span>
        </button>

        {/* Background Animation Elements */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#48423c] rounded-full opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 2}s`,
                animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
              }}
            />
          ))}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }

          @keyframes marquee {
            100% {
              transform: translate3d(-50%, 0, 0);
            }
          }

          body {
            font-family: 'Antonio', sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `
      }} />
    </div>
  );
}

export default LandingPage;
