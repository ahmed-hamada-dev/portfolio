module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {},
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                scroll: {
                    to: {
                        transform: 'translateX(calc(-50% - 0.5rem))'
                    }
                },
                'scroll-reverse': {
                    to: {
                        transform: 'translateX(calc(50% + 0.5rem))'
                    }
                }
            },


            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                scroll: 'scroll 25s linear infinite',
                'scroll-reverse': 'scroll-reverse 25s linear infinite'
            }
        },
    },
    plugins: [],
};