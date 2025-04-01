// animations.js
export const FadeUp = (delay = 0) => {
    return {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1] // Added smooth easing
            },
        },
    };
};

export const FadeLeft = (delay = 0) => {
    return {
        hidden: {
            opacity: 0,
            x: 100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1] // Added smooth easing
            },
        },
    };
};

export const FadeRight = (delay = 0) => {
    return {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                delay: delay,
                ease: [0.25, 0.1, 0.25, 1] // Added smooth easing
            },
        },
    };
};

export const ScaleUp = (delay = 0) => {
    return {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7,
                delay: delay,
                ease: "backOut" // Special scaling effect
            },
        },
    };
};

export const RotateIn = (delay = 0) => {
    return {
        hidden: {
            opacity: 0,
            rotate: -15,
        },
        visible: {
            opacity: 1,
            rotate: 0,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: "circOut" // Smooth rotation
            },
        },
    };
};

// Container animation for staggering children
export const StaggerContainer = (delayChildren = 0.1) => {
    return {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: delayChildren,
                delayChildren: 0.2
            }
        }
    };
};