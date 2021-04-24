import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import ltlogo from "../../assets/imgs/uac_logo.png";

export type LowerThirdsSize = "small" | "medium" | "large" | number;

interface LowerThirdsProp {
  size?: LowerThirdsSize;
  shadow?: boolean;
  disablelogo?: boolean;
  className?: string;
  [key: string]: any;
  reversecut?: boolean;
  nocut?: boolean;
}

const getPercentage = (base: number, n: number) => {
  return (n / base) * 100;
};

export const getLTWidth = (size?: string | number): number => {
  if (!isNumber(size)) {
    switch (size) {
      case "small":
        return 490 * 0.746031746031746;
      case "medium":
        return 863 * 0.746031746031746;
      case "large":
        return 1614 * 0.746031746031746;
      default:
        return 863 * 0.746031746031746;
    }
  } else {
    var x: number = +(size ?? 863) * 0.746031746031746;
    return x;
  }
};

const isNumber = (n: any): boolean => {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
};

const ms = makeStyles({
  lowerThirds: {
    // margin: 50,
    height: 126 * 0.746031746031746,
    // 74.6031746031746%
    backgroundColor: "#0d0e0e",
    transition: "0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    width: ({ size }: LowerThirdsProp): number => getLTWidth(size),
    clipPath: ({ size, reversecut, nocut }: LowerThirdsProp) =>
      reversecut
        ? `polygon(
            -100% -100%,
            200% -100%,
            200% 200%,
            ${getPercentage(getLTWidth(size), 39 * 0.746031746031746)}% 200%,
            ${getPercentage(getLTWidth(size), 39 * 0.746031746031746)}% 100%,
            0% ${getPercentage(
              126 * 0.746031746031746,
              90 * 0.746031746031746
            )}%
            -100% ${getPercentage(
              126 * 0.746031746031746,
              90 * 0.746031746031746
            )}%
          )`
        : `polygon(
            -100% -100%,
            200% -100%,
            200% ${getPercentage(
              126 * 0.746031746031746,
              90 * 0.746031746031746
            )}%,
            100% ${getPercentage(
              126 * 0.746031746031746,
              90 * 0.746031746031746
            )}%,
            ${
              100 - getPercentage(getLTWidth(size), 39 * 0.746031746031746)
            }% 100%,
            ${
              100 - getPercentage(getLTWidth(size), 39 * 0.746031746031746)
            }% 200%,
            -100% 200%
            )`,

    display: "flex",
  },
  shadowWrapper: {
    filter: (props): string =>
      props.shadow
        ? props.reversecut
          ? `drop-shadow(${-12 * 0.746031746031746}px ${
              9 * 0.746031746031746
            }px 0 #ffd200)`
          : `drop-shadow(${12 * 0.746031746031746}px ${
              9 * 0.746031746031746
            }px 0 #ffd200)`
        : "none",
  },
  logo: {
    position: "relative",
    height: 126 * 0.746031746031746,
    width: 128 * 0.746031746031746,
    backgroundColor: "#ffd200",

    "& .logo": {
      position: "relative",
      height: 126 * 0.746031746031746,
      width: 128 * 0.746031746031746,
      backgroundColor: "#ffd200",
      zIndex: 100,
      backgroundSize: "auto 75%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${ltlogo})`,
    },

    "&::before": {
      content: "''",
      width: 160 * 0.746031746031746,
      height: 126 * 0.746031746031746,
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#ffd200",
      clipPath: `polygon(0% 0%, 100% 0%, ${getPercentage(
        160 * 0.746031746031746,
        128 * 0.746031746031746
      )}% 100%, 0% 100%)`,
      zIndex: 90,
    },
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});

const LowerThirds: React.FC<LowerThirdsProp> = ({
  className,
  children,
  disablelogo,
  nocut,
  reversecut,
  shadow,
  size,
  ...props
}) => {
  const c = ms({ disablelogo, nocut, reversecut, shadow, size });
  return (
    <div className={c.shadowWrapper + " " + className} {...props}>
      <div className={c.lowerThirds}>
        {!disablelogo && (
          <div className={c.logo}>
            <div className="logo"></div>
          </div>
        )}
        <div className={c.content}>{children}</div>
      </div>
    </div>
  );
};

export default LowerThirds;
