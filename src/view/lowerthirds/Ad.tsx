import { makeStyles } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AdProps } from "../../config/types/ads.interface";
import { ReduxState } from "../../config/types/types";

const makeComponentStyles = makeStyles({
  adPage: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: "0px 20px",

    "& .img": {
      margin: "0px 20px",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      transformOrgin: "center",
      transition: "all 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
    },

    "& .text": {
      flex: 1,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",

      "& .head": {
        color: "#ffd200",
        fontFamily: "'industry', sans-serif",
        fontSize: 25,
        fontWeight: "bold",
        textTransform: "uppercase",
        lineHeight: 1,
        marginBottom: 3,
        transition: "all 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
      },

      "& .content": {
        textTransform: "uppercase",
        fontFamily: "industry",
        color: "#f9f9f9",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: -5,
        lineHeight: 1,
        transition: "all 0.6s cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
});

interface AdComponentProps {
  small?: boolean;
  className?: string;
  [key: string]: any;
}

const Ad: FC<AdComponentProps> = ({ small, children, className, ...props }) => {
  const classes = makeComponentStyles();
  const { lowerThirdsIngame, lowerThirds } = useSelector(
    (state: ReduxState) => state.live
  );
  const ad = small ? lowerThirds?.ad : lowerThirdsIngame?.ad;

  return (
    <div className={classes.adPage + " " + className} {...props}>
      <div
        className="img"
        style={{
          height: (ad?.img?.adj?.h ?? 90) * (small ? 0.746031746031746 : 1),
          width: (ad?.img?.adj?.w ?? 120) * (small ? 0.746031746031746 : 1),
          backgroundImage: `url(${ad?.img?.url})`,
          transform: `
            translateX(${
              (ad?.img?.adj?.x ?? 0) * (small ? 0.746031746031746 : 1)
            }px)
            translateY(${
              (ad?.img?.adj?.y ?? 0) * (small ? 0.746031746031746 : 1)
            }px)
            scale(${
              1 +
              (ad?.img?.adj?.scale ?? 0) *
                0.01 *
                (small ? 0.746031746031746 : 1)
            })
            scaleX(${ad?.img?.adj?.flip_x ? -1 : 1})
          `,
        }}
      ></div>
      <div className="text">
        <div
          className="head"
          style={{
            fontSize:
              (ad?.head?.adj?.font_size || 25) *
              (small ? 0.746031746031746 : 1),
          }}
        >
          {ad?.head?.text}
        </div>
        <div
          className="content"
          style={{
            fontSize:
              (ad?.content?.adj?.font_size || 25) *
              (small ? 0.746031746031746 : 1),
          }}
        >
          {ad?.content?.text}
        </div>
      </div>
    </div>
  );
};

export default Ad;
