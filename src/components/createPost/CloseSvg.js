import React from 'react';

const CloseSvg = () => {
    return (
        <div className="z-20">
            <svg
            style={{
                color: 'white'
            }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </div>
    );
};

export default CloseSvg;
