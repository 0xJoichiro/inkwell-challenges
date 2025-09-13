import React, { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

// Helper function to determine closest edge
const closestEdge = (x: number, y: number, w: number, h: number) => {
  const xDiff = x - (w / 2);
  const yDiff = y - (h / 2);
  const topEdgeDist = Math.abs(yDiff - h / 2);
  const bottomEdgeDist = Math.abs(yDiff + h / 2);
  const min = Math.min(topEdgeDist, bottomEdgeDist);
  return min === topEdgeDist ? 'top' : 'bottom';
};

interface MarqueeItemData {
  city: string;
  venues: Array<{
    name: string;
    image: string;
  }>;
}

interface MarqueeItemProps {
  data: MarqueeItemData;
  onClick?: () => void;
}

// Individual marquee item component
const MarqueeItem: React.FC<MarqueeItemProps> = ({ data, onClick }) => {
  const navigate = useNavigate();
  const itemRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (data.city === 'Enter The App') {
      navigate('/home');
    } else if (onClick) {
      onClick();
    }
  };

  useLayoutEffect(() => {
    const item = itemRef.current;
    const link = linkRef.current;
    const marquee = marqueeRef.current;
    const marqueeInner = marqueeInnerRef.current;

    if (!item || !link || !marquee || !marqueeInner) return;

    // Mouse enter handler
    const handleMouseEnter = (ev: MouseEvent) => {
      const edge = closestEdge(
        ev.pageX - item.offsetLeft,
        ev.pageY - item.offsetTop,
        item.clientWidth,
        item.clientHeight
      );

      gsap.timeline({ defaults: { duration: 0.6, ease: 'expo' } })
        .set(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .set(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0)
        .to([marquee, marqueeInner], { y: '0%' }, 0);
    };

    // Mouse leave handler
    const handleMouseLeave = (ev: MouseEvent) => {
      const edge = closestEdge(
        ev.pageX - item.offsetLeft,
        ev.pageY - item.offsetTop,
        item.clientWidth,
        item.clientHeight
      );

      gsap.timeline({ defaults: { duration: 0.6, ease: 'expo' } })
        .to(marquee, { y: edge === 'top' ? '-101%' : '101%' }, 0)
        .to(marqueeInner, { y: edge === 'top' ? '101%' : '-101%' }, 0);
    };

    link.addEventListener('mouseenter', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      link.removeEventListener('mouseenter', handleMouseEnter);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={itemRef}
      className="menu-item"
      style={{
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: '0 -1px #2A2342'
      }}
    >
      <a
        ref={linkRef}
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleClick();
        }}
        style={{
          display: 'block',
          position: 'relative',
          cursor: 'pointer',
          fontSize: '6vw',
          lineHeight: '1.2',
          fontWeight: 600,
          padding: '1vh 1vw 0',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        {data.city}
      </a>
      
      <div
        ref={marqueeRef}
        className="marquee"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          background: '#000',
          transform: 'translate3d(0,101%,0)'
        }}
      >
        <div
          ref={marqueeInnerRef}
          className="marquee__inner-wrap"
          style={{
            height: '100%',
            width: '100%',
            transform: 'translate3d(0,-101%,0)',
          }}
        >
          <div
            className="marquee__content"
            style={{
              height: '100%',
              width: 'fit-content',
              alignItems: 'center',
              display: 'flex',
              position: 'relative',
              animation: 'marquee 15s linear infinite',
              willChange: 'transform'
            }}
          >
            {data.venues.map((venue, index) => (
              <React.Fragment key={index}>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: '6vw',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    padding: '1vh 1vw 0',
                    textTransform: 'uppercase',
                    color: '#8F6FFF'
                  }}
                >
                  {venue.name}
                </span>
                <div
                  style={{
                    width: '15vw',
                    height: '70%',
                    margin: '0 2vw',
                    borderRadius: '5vw',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%',
                    backgroundImage: `url(${venue.image})`,
                    backgroundColor: '#333'
                  }}
                />
              </React.Fragment>
            ))}
            {/* Duplicate content for seamless loop */}
            {data.venues.map((venue, index) => (
              <React.Fragment key={`duplicate-${index}`}>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    fontSize: '6vw',
                    lineHeight: '1.2',
                    fontWeight: 400,
                    padding: '1vh 1vw 0',
                    textTransform: 'uppercase',
                    color: '#8F6FFF'
                  }}
                >
                  {venue.name}
                </span>
                <div
                  style={{
                    width: '15vw',
                    height: '70%',
                    margin: '0 2vw',
                    borderRadius: '5vw',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%',
                    backgroundImage: `url(${venue.image})`,
                    backgroundColor: '#333'
                  }}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
export const MarqueeMenu: React.FC = () => {

const menuData: MarqueeItemData[] = [
  {
    city: 'Enter The App',
    venues: [
      { 
        name: 'Enter The Arena', 
        image: 'https://cdn.cosmos.so/d091c5cd-7678-49f2-a29a-2a1391c0385c?format=jpeg' 
      },
      { 
        name: 'Exploit Lab', 
        image: 'https://cdn.cosmos.so/b3216c52-ab79-4d1c-8d11-3900c23da675?format=jpeg' 
      },
      { 
        name: 'Defense Forge', 
        image: 'https://cdn.cosmos.so/3ff4271a-2b4b-4d07-96db-9a44d8ad120d?format=jpeg' 
      },
      { 
        name: 'Final Hackdown', 
        image: 'https://cdn.cosmos.so/973ddbc5-44e1-4190-aa61-37c6ae2ab171?format=jpeg' 
      }
    ]
  },
  {
    city: 'Social Media',
    venues: [
      { name: 'Twitter', image: 'https://images.icon-icons.com/3685/PNG/512/twitter_logo_icon_229281.png' },
      { name: 'Discord', image: 'https://images.icon-icons.com/3685/PNG/512/discord_logo_icon_229279.png' },
      { name: 'Telegram', image: 'https://images.icon-icons.com/3685/PNG/512/telegram_logo_icon_229299.png' },
      { name: 'Github', image: 'https://images.icon-icons.com/3685/PNG/512/github_logo_icon_229278.png' }
    ]
  },
  {
    city: 'Chains Support',
    venues: [
      { name: 'Peaq Testnet', image: 'https://use.ink/img/chains/peaq.svg' },
      { name: 'Enjin Testnet', image: 'https://use.ink/img/chains/enjin.svg' },
      { name: 'Paseo Testnet', image: 'https://use.ink/img/chains/testnet.svg' },
    ]
  },
  {
    city: 'Resources',
    venues: [
      { name: 'Docs', image: 'https://cdn.cosmos.so/b50357db-4379-4961-93f1-e88db267c5dd?format=jpeg' },
      { name: 'Tutorials', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop&q=80' },
      { name: 'Security Guides', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop&q=80' },
      { name: 'Community', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&q=80' }
    ]
  }
];

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .menu-item {
          flex: 1;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background-color: #ffffff;
          color: #130F21;
        }
      `}</style>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        position: 'relative',
        justifyContent: 'center'
      }}>
        <nav style={{ 
          width: '100%', 
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {menuData.map((item, index) => (
            <MarqueeItem key={item.city} data={item} />
          ))}
        </nav>
      </div>
    </>
  );
};

export default MarqueeMenu;
