import React from 'react';
import type { SVGProps } from 'react';

 export default function BiEyeFill(props: SVGProps<SVGSVGElement>) {
	return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="1em" 
      height="1em" 
      viewBox="0 0 16 16" 
      {...props}>
      <g fill="currentColor">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0">
        </path>
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7">
        </path>
      </g>
    </svg>);
};