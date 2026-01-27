"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

interface MergedShapeProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
    fill?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

const AboutGrid = ({ fill = "#ffffff", children, style: containerStyle, ...props }: MergedShapeProps) => (
    <div className="w-full h-full flex items-center justify-center">
        <div
            style={{
                position: 'relative',
                width: 920,
                height: 510,
                ...containerStyle,
            }}
            {...props}
        >
            {/* Shape 1 */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 200,
                    width: 320,
                    height: 310,
                    backgroundColor: fill,
                    borderRadius: '32px 0px 32px 32px',
                }}
            >
                {/* Add content here */}
            </div>
            {/* Shape 2 */}
            <div
                style={{
                    position: 'absolute',
                    left: 280,
                    top: 0,
                    width: 270,
                    height: 200,
                    backgroundColor: fill,
                    borderRadius: '32px 32px 0px 0px',
                }}
            >
                {/* Add content here */}
            </div>
            {/* Shape 3 */}
            <div
                style={{
                    position: 'absolute',
                    left: 500,
                    top: 200,
                    width: 320,
                    height: 130,
                    backgroundColor: fill,
                    borderRadius: '0px 32px 0px 0px',
                }}
            >
                {/* Add content here */}
            </div>
            {/* Shape 4 */}
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 270,
                    height: 190,
                    backgroundColor: fill,
                    borderRadius: '32px 32px 32px 32px',
                }}
            >
                {/* Add content here */}
            </div>
            {/* Shape 5 */}
            <div
                style={{
                    position: 'absolute',
                    left: 560,
                    top: 0,
                    width: 360,
                    height: 190,
                    backgroundColor: fill,
                    borderRadius: '32px 32px 32px 32px',
                }}
            >
                {/* Add content here */}
            </div>
            {/* Shape 6 */}
            <div
                style={{
                    position: 'absolute',
                    left: 330,
                    top: 290,
                    width: 170,
                    height: 220,
                    backgroundColor: fill,
                    borderRadius: '32px 0px 32px 32px',
                }}
            >
                {/* Add content here */}
            </div>
            {/* Shape 7 */}
            <div
                style={{
                    position: 'absolute',
                    left: 680,
                    top: 330,
                    width: 240,
                    height: 180,
                    backgroundColor: fill,
                    borderRadius: '0px 32px 32px 32px',
                }}
            >
                {/* Add content here */}
            </div>
            {/* Negative Space 1 - Content container for empty region */}
            <div
                style={{
                    position: 'absolute',
                    left: 270,
                    top: 190,
                    width: 10,
                    height: 10,
                    // Transparent container for content in negative space
                }}
            >
                {/* Add content here */}
            </div>
            {/* Negative Space 2 - Content container for empty region */}
            <div
                style={{
                    position: 'absolute',
                    left: 550,
                    top: 190,
                    width: 10,
                    height: 10,
                    // Transparent container for content in negative space
                }}
            >
                {/* Add content here */}
            </div>
            {/* Negative Space 3 - Content container for empty region */}
            <div
                style={{
                    position: 'absolute',
                    left: 320,
                    top: 200,
                    width: 180,
                    height: 90,
                    // Transparent container for content in negative space
                }}
            >
                {/* Add content here */}
            </div>
            {/* Negative Space 4 - Content container for empty region */}
            <div
                style={{
                    position: 'absolute',
                    left: 500,
                    top: 330,
                    width: 180,
                    height: 180,
                    // Transparent container for content in negative space
                }}
            >
                {/* Add content here */}
            </div>
            {/* Negative Space 5 - Content container for empty region */}
            <div
                style={{
                    position: 'absolute',
                    left: 820,
                    top: 190,
                    width: 100,
                    height: 140,
                    // Transparent container for content in negative space
                }}
            >
                {/* Add content here */}
            </div>
            {/* Bridge 1 */}
            <svg
                style={{
                    position: 'absolute',
                    left: 248,
                    top: 168,
                    width: 32,
                    height: 32,
                    pointerEvents: 'none',
                }}
                viewBox="-32 0 32 32"
            >
                <path d="M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z" fill={fill} />
            </svg>
            {/* Bridge 2 */}
            <svg
                style={{
                    position: 'absolute',
                    left: 320,
                    top: 200,
                    width: 32,
                    height: 32,
                    pointerEvents: 'none',
                }}
                viewBox="0 -32 32 32"
            >
                <path d="M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z" fill={fill} />
            </svg>
            {/* Bridge 3 */}
            <svg
                style={{
                    position: 'absolute',
                    left: 468,
                    top: 200,
                    width: 32,
                    height: 32,
                    pointerEvents: 'none',
                }}
                viewBox="-32 -32 32 32"
            >
                <path d="M 0 0 C 0 -23.872 -5.76 -32 -32 -32 H 0 Z" fill={fill} />
            </svg>
            {/* Bridge 4 */}
            <svg
                style={{
                    position: 'absolute',
                    left: 550,
                    top: 168,
                    width: 32,
                    height: 32,
                    pointerEvents: 'none',
                }}
                viewBox="0 0 32 32"
            >
                <path d="M 0 0 C 0 23.872 5.76 32 32 32 H 0 Z" fill={fill} />
            </svg>
            {/* Bridge 5 */}
            <svg
                style={{
                    position: 'absolute',
                    left: 468,
                    top: 258,
                    width: 32,
                    height: 32,
                    pointerEvents: 'none',
                }}
                viewBox="-32 0 32 32"
            >
                <path d="M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z" fill={fill} />
            </svg>
            {/* Bridge 6 */}
            <svg
                style={{
                    position: 'absolute',
                    left: 648,
                    top: 330,
                    width: 32,
                    height: 32,
                    pointerEvents: 'none',
                }}
                viewBox="-32 -32 32 32"
            >
                <path d="M 0 0 C 0 -23.872 -5.76 -32 -32 -32 H 0 Z" fill={fill} />
            </svg>
            {/* Bridge 7 */}
            <svg
                style={{
                    position: 'absolute',
                    left: 500,
                    top: 330,
                    width: 32,
                    height: 32,
                    pointerEvents: 'none',
                }}
                viewBox="0 -32 32 32"
            >
                <path d="M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z" fill={fill} />
            </svg>
            {/* Bridge 8 */}
            <svg
                style={{
                    position: 'absolute',
                    left: 820,
                    top: 298,
                    width: 32,
                    height: 32,
                    pointerEvents: 'none',
                }}
                viewBox="0 0 32 32"
            >
                <path d="M 0 0 C 0 23.872 5.76 32 32 32 H 0 Z" fill={fill} />
            </svg>
            {children}
        </div>
    </div>

);

export default AboutGrid;