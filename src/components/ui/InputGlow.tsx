"use client";
import React, { forwardRef, useState } from "react";
import { cn } from "../../utils/cn";
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';

export interface InputGlowProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  isTextarea?: boolean;
}

const InputGlow = forwardRef<HTMLInputElement & HTMLTextAreaElement, InputGlowProps>(
  ({ className, type, isTextarea = false, ...props }, ref) => {
    const radius = 100;
    const [visible, setVisible] = useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    const InputElement = isTextarea ? 'textarea' : 'input';

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              #4f46e5,
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[1.5px] transition duration-300"
      >
        <InputElement
          // @ts-ignore
          ref={ref}
          type={type}
          className={cn(
            `flex w-full rounded-lg border-none bg-gray-800 px-4 py-3 text-base text-white transition duration-400 group-hover/input:shadow-none placeholder:text-neutral-500 focus-visible:ring-[2px] focus-visible:ring-gray-600 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            isTextarea ? 'min-h-[100px] resize-none' : 'h-11',
            className,
          )}
          {...props}
        />
      </motion.div>
    );
  }
);
InputGlow.displayName = "InputGlow";

const LabelGlow = forwardRef<
  React.ElementRef<'label'>,
  React.ComponentPropsWithoutRef<'label'>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-gray-300 mb-2 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
LabelGlow.displayName = "LabelGlow";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

export { InputGlow, LabelGlow, LabelInputContainer, BottomGradient };
