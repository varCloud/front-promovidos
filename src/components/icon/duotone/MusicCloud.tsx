import React, { SVGProps } from 'react';

const SvgMusicCloud = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox='0 0 24 24' className='svg-icon' {...props}>
			<g fill='none' fillRule='evenodd'>
				<path d='M0 0h24v24H0z' />
				<path
					d='M14.93 9H18a6 6 0 110 12H9c-.156 0-.31-.006-.464-.018A8 8 0 1114.93 9z'
					fill='currentColor'
					opacity={0.3}
				/>
				<path
					d='M10.583 18.5C9.71 18.5 9 17.892 9 17.142c0-.75.709-1.358 1.583-1.358.185 0 .363.027.528.077v-3.768c0-.279.169-.525.417-.608l3.034-.956c.383-.128.771.179.771.608v.956c0 .318-.29.521-.527.58-.343.084-1.223.265-2.64.543v3.954a.765.765 0 01-.01.135c-.095.673-.763 1.195-1.573 1.195z'
					fill='currentColor'
				/>
			</g>
		</svg>
	);
};

export default SvgMusicCloud;
