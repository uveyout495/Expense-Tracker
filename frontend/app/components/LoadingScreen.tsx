import React, { useEffect, useState } from "react";

type Particle = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
};

const LoadingScreen: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const data: Particle[] = Array.from({ length: 30 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));

    setParticles(data);
  }, []);

  return (
    <>
      <div style={styles.wrapper}>

        {/* Background glow */}
        <div style={styles.glow}></div>

        {/* Particles */}
        {particles.map((p, i) => (
          <span
            key={i}
            style={{
              ...styles.particle,
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Center */}
        <div style={styles.center}>

          {/* Rings */}
          <div style={styles.ring}></div>
          <div style={{ ...styles.ring, ...styles.ring2 }}></div>

          {/* Coin */}
          <div style={styles.coin}>₹</div>

          {/* Text */}
          <h1 style={styles.title}>EXPENSIO</h1>
          <p style={styles.sub}>Smart Expense Tracker</p>

          {/* Loader bar */}
          <div style={styles.bar}>
            <div style={styles.barFill}></div>
          </div>

          {/* dots */}
          <div style={styles.dots}>
            <span style={styles.dot}></span>
            <span style={styles.dot}></span>
            <span style={styles.dot}></span>
          </div>

        </div>
      </div>

      {/* INLINE CSS ANIMATION */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }

        @keyframes spin {
          from { transform: rotate(0); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0); }
        }

        @keyframes load {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
};

export default LoadingScreen;

/* ---------------- STYLES ---------------- */

const styles: Record<string, React.CSSProperties> = {

  wrapper: {
    position: "fixed",
    inset: 0,
    background: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  glow: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top, rgba(255,215,0,0.15), transparent 50%)",
    animation: "pulse 3s infinite",
  },

  particle: {
    position: "absolute",
    background: "gold",
    borderRadius: "50%",
    opacity: 0.7,
    animation: "float linear infinite",
  },

  center: {
    position: "relative",
    textAlign: "center",
    color: "white",
  },

  ring: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: "50%",
    border: "2px solid rgba(255,215,0,0.2)",
    animation: "spin 8s linear infinite",
  },

  ring2: {
    width: 170,
    height: 170,
    borderStyle: "dashed",
    animation: "spinReverse 10s linear infinite",
    margin: "auto",
  },

  coin: {
    position: "absolute",
    top: 80,
    left: "50%",
    transform: "translateX(-50%)",
    width: 90,
    height: 90,
    borderRadius: "50%",
    background: "gold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    boxShadow: "0 0 30px rgba(255,215,0,0.6)",
    animation: "float 3s ease-in-out infinite",
  },

  title: {
    marginTop: 260,
    fontSize: 28,
    letterSpacing: 6,
    background: "linear-gradient(90deg, gold, orange)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  sub: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 5,
  },

  bar: {
    width: 280,
    height: 6,
    background: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    margin: "20px auto",
    overflow: "hidden",
  },

  barFill: {
    width: "50%",
    height: "100%",
    background: "linear-gradient(90deg, gold, orange)",
    animation: "load 2s infinite",
  },

  dots: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
  },

  dot: {
    width: 6,
    height: 6,
    background: "gold",
    borderRadius: "50%",
    animation: "bounce 1s infinite",
  },
};