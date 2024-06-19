import React, { useEffect } from 'react';
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Line, SvgProps } from 'react-native-svg';

const AnimatedLine = Animated.createAnimatedComponent(Line);

export const AnimatedClock = (props: SvgProps & { customDate?: Date }) => {
    const { customDate } = props;

    const hourHand = useSharedValue(0);
    const minuteHand = useSharedValue(0);

    useEffect(() => {
        let hours = 0;
        let minutes = 0;

      if (customDate != null) {
          hours = customDate.getHours();
          minutes = customDate.getMinutes();
      } else {
          const now = new Date();
          hours = now.getHours();
          minutes = now.getMinutes();
      }

      // Determine the duration and easing based on whether customDate is provided
      const duration = customDate ? 500 : 2000; // Snappier for customDate, smoother for current time
      const easing = customDate ? Easing.inOut(Easing.quad) : Easing.bezier(0.25, 0.1, 0.25, 1); // Different easing for customDate and current time

      // Animate the hour hand (30 degrees per hour)
      hourHand.value = withTiming((hours + minutes / 60) * 30, {
          duration,
          easing,
      });

      // Animate the minute hand (6 degrees per minute)
      minuteHand.value = withTiming(minutes * 6, {
          duration,
          easing,
      });
  }, [customDate]);

    const animatedHourHandProps = useAnimatedProps(() => {
        const angle = hourHand.value;
        const x2 = 12 + 7 * Math.sin((angle * Math.PI) / 180);
        const y2 = 12 - 7 * Math.cos((angle * Math.PI) / 180);
        return { x2, y2 };
    });

    const animatedMinuteHandProps = useAnimatedProps(() => {
        const angle = minuteHand.value;
        const x2 = 12 + 10 * Math.sin((angle * Math.PI) / 180);
        const y2 = 12 - 10 * Math.cos((angle * Math.PI) / 180);
        return { x2, y2 };
    });

    return (
        <Svg
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 24 24"
            fill="none"
            {...props}>
            <Circle stroke={props.color || '#B8B8B8'} strokeWidth={3} cx={12} cy={12} r={10} />
            <AnimatedLine
                x1={12}
                y1={12}
                stroke={props.color || '#B8B8B8'}
                strokeWidth={2}
                strokeLinecap="round"
                animatedProps={animatedHourHandProps}
            />
            <AnimatedLine
                x1={12}
                y1={12}
                stroke={props.color || '#B8B8B8'}
                strokeWidth={1}
                strokeLinecap="round"
                animatedProps={animatedMinuteHandProps}
            />
        </Svg>
    );
};
