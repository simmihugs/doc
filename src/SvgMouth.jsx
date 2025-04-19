import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

export const EXPRESSION_ORDER = ["neutral", "smile", "surprised", "sad"];

const MOUTH_PATHS = {
  neutral: "M 75 130 Q 100 135 125 130",
  smile: "M 75 130 Q 100 145 125 130",
  surprised: "M 90 130 Q 100 140 110 130 Q 100 150 90 130 Z",
  sad: "M 75 140 Q 100 130 125 140",
  open: "M 80 130 Q 100 170 120 130",
};

export default function SvgMouth({
  mouthExpression: propMouthExpression,
  onMouthAnimationComplete,
  setTalking,
  talking,
}) {
  const pathRef = useRef(null);
  const currentExpression = useRef(propMouthExpression);
  const speechTimeline = useRef(null);
  const [mouthExpression, setMouthExpression] = useState(propMouthExpression);
  const talkingTimeout = useRef(null);
  const animationDuration = 1000;

  useEffect(() => {
    if (propMouthExpression !== currentExpression.current && pathRef.current) {
      gsap.to(pathRef.current, {
        duration: 0.3,
        attr: { d: MOUTH_PATHS[propMouthExpression] || MOUTH_PATHS.neutral },
        ease: "easeInOutQuad",
        onComplete: () => {
          currentExpression.current = propMouthExpression;
          setMouthExpression(propMouthExpression);
          if (onMouthAnimationComplete) {
            onMouthAnimationComplete(propMouthExpression);
          }
        },
      });
      currentExpression.current = propMouthExpression;
    } else if (!pathRef.current && MOUTH_PATHS[propMouthExpression]) {
      gsap.set(pathRef.current, {
        attr: { d: MOUTH_PATHS[propMouthExpression] },
      });
      currentExpression.current = propMouthExpression;
      setMouthExpression(propMouthExpression);
    }
  }, [propMouthExpression, onMouthAnimationComplete]);

  const transitionToExpression = useCallback(
    (targetExpression, duration = 0.3) => {
      if (pathRef.current && MOUTH_PATHS[targetExpression]) {
        gsap.to(pathRef.current, {
          duration: duration,
          attr: { d: MOUTH_PATHS[targetExpression] },
          ease: "easeInOutQuad",
          onComplete: () => {
            currentExpression.current = targetExpression;
            setMouthExpression(targetExpression);
            if (onMouthAnimationComplete) {
              onMouthAnimationComplete(targetExpression);
            }
          },
        });
        setMouthExpression(targetExpression);
      }
    },
    [onMouthAnimationComplete],
  );

  const startSpeech = useCallback(
    (speed = 0.1) => {
      if (pathRef.current && !speechTimeline.current) {
        speechTimeline.current = gsap.timeline({ repeat: -1, yoyo: true });
        speechTimeline.current.to(pathRef.current, {
          duration: speed,
          attr: { d: MOUTH_PATHS.neutral },
        });
        speechTimeline.current.to(pathRef.current, {
          duration: speed,
          attr: { d: MOUTH_PATHS.open },
        });

        talkingTimeout.current = setTimeout(() => {
          setTalking(false);
        }, animationDuration);
      }
    },
    [setTalking],
  );

  const stopSpeech = useCallback(() => {
    if (speechTimeline.current) {
      speechTimeline.current.pause();
      transitionToExpression(currentExpression.current);
      speechTimeline.current = null;
    }

    if (talkingTimeout.current) {
      clearTimeout(talkingTimeout.current);
      talkingTimeout.current = null;
    }
  }, [transitionToExpression]);

  useEffect(() => {
    if (talking) {
      startSpeech();
    } else {
      stopSpeech();
    }
  }, [talking, startSpeech, stopSpeech]);

  useEffect(() => {
    return () => {
      if (talkingTimeout.current) {
        clearTimeout(talkingTimeout.current);
      }
      if (speechTimeline.current) {
        speechTimeline.current.kill();
      }
    };
  }, []);

  return (
    <>
      <path
        ref={pathRef}
        d={mouthExpression ? MOUTH_PATHS[mouthExpression] : MOUTH_PATHS.neutral}
        fill="#383221"
        stroke="black"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d={MOUTH_PATHS.neutral}
        fill="none"
        stroke="black"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
}
