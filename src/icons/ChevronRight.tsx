import React from 'react';
import type { SVGProps } from 'react';

export default function BiChevronRight(props: SVGProps<SVGSVGElement>) {
	return (
    <svg xmlns="http://www.w3.org/2000/svg" 
      width="1em" 
      height="1em" 
      viewBox="0 0 16 16" 
      {...props}>
        <path fill="currentColor" fillRule="evenodd" 
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8L4.646 2.354a.5.5 0 0 1 0-.708">
        </path>
    </svg>
    );
}