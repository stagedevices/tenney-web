type PressDevice = {
  src: string;
  alt: string;
};

type PressDeviceFamilyProps = {
  iPhone?: PressDevice;
  iPad?: PressDevice;
  Mac?: PressDevice;
  isDesktop: boolean;
};

const desktopLayout = {
  iPhone: {
    width: "clamp(210px, 20vw, 320px)",
    left: "50%",
    top: "55%",
    transform:
      "translate(-50%, -50%) translateZ(80px) rotateY(0deg) rotateX(4deg) rotateZ(0.5deg)",
    shadow: "drop-shadow(0 22px 32px rgba(15, 23, 42, 0.28))",
    zIndex: 30,
  },
  iPad: {
    width: "clamp(260px, 26vw, 420px)",
    left: "34%",
    top: "58%",
    transform:
      "translate(-50%, -50%) translateZ(10px) rotateY(-14deg) rotateX(6deg) rotateZ(-2deg) scale(0.92)",
    shadow: "drop-shadow(0 30px 48px rgba(15, 23, 42, 0.22))",
    zIndex: 20,
  },
  Mac: {
    width: "clamp(320px, 30vw, 520px)",
    left: "68%",
    top: "60%",
    transform:
      "translate(-50%, -50%) translateZ(0px) rotateY(16deg) rotateX(5deg) rotateZ(1.5deg) scale(0.88)",
    shadow: "drop-shadow(0 38px 64px rgba(15, 23, 42, 0.2))",
    zIndex: 10,
  },
};

const mobileLayout = {
  iPhone: {
    width: "clamp(210px, 20vw, 320px)",
    left: "50%",
    top: "55%",
    transform:
      "translate(-50%, -50%) translateZ(60px) rotateY(0deg) rotateX(3deg) rotateZ(0.5deg)",
    shadow: "drop-shadow(0 20px 30px rgba(15, 23, 42, 0.26))",
    zIndex: 30,
  },
  iPad: {
    width: "clamp(260px, 26vw, 420px)",
    left: "28%",
    top: "58%",
    transform:
      "translate(-50%, -50%) translateZ(8px) rotateY(-10deg) rotateX(4deg) rotateZ(-2deg) scale(0.92)",
    shadow: "drop-shadow(0 28px 44px rgba(15, 23, 42, 0.22))",
    zIndex: 20,
  },
  Mac: {
    width: "clamp(320px, 30vw, 520px)",
    left: "72%",
    top: "60%",
    transform:
      "translate(-50%, -50%) translateZ(0px) rotateY(10deg) rotateX(3deg) rotateZ(1.5deg) scale(0.88)",
    shadow: "drop-shadow(0 34px 60px rgba(15, 23, 42, 0.2))",
    zIndex: 10,
  },
};

export default function PressDeviceFamily({ iPhone, iPad, Mac, isDesktop }: PressDeviceFamilyProps) {
  const layout = isDesktop ? desktopLayout : mobileLayout;

  return (
    <div
      className="relative isolate pointer-events-none"
      style={{
        height: "clamp(260px, 42vh, 520px)",
        perspective: "1400px",
        transformStyle: "preserve-3d",
      }}
    >
      {Mac ? (
        <div
          className="absolute"
          style={{
            width: layout.Mac.width,
            left: layout.Mac.left,
            top: layout.Mac.top,
            transform: layout.Mac.transform,
            zIndex: layout.Mac.zIndex,
          }}
        >
          <img
            src={Mac.src}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            draggable={false}
            className="h-auto w-full select-none"
            style={{ filter: layout.Mac.shadow }}
          />
        </div>
      ) : null}
      {iPad ? (
        <div
          className="absolute"
          style={{
            width: layout.iPad.width,
            left: layout.iPad.left,
            top: layout.iPad.top,
            transform: layout.iPad.transform,
            zIndex: layout.iPad.zIndex,
          }}
        >
          <img
            src={iPad.src}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            draggable={false}
            className="h-auto w-full select-none"
            style={{ filter: layout.iPad.shadow }}
          />
        </div>
      ) : null}
      {iPhone ? (
        <div
          className="absolute"
          style={{
            width: layout.iPhone.width,
            left: layout.iPhone.left,
            top: layout.iPhone.top,
            transform: layout.iPhone.transform,
            zIndex: layout.iPhone.zIndex,
          }}
        >
          <img
            src={iPhone.src}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
            draggable={false}
            className="h-auto w-full select-none"
            style={{ filter: layout.iPhone.shadow }}
          />
        </div>
      ) : null}
    </div>
  );
}
