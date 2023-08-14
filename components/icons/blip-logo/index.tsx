import React from 'react';
interface Props {
	size?: string;
	width?: string;
	height?: string;
	props?: React.SVGProps<SVGSVGElement>;
}

const BlipLogo = ({ size, width = '111', height = '128', props }: Props) => {
	return (
		<svg
			width={size || width}
			height={size || height}
			viewBox='0 0 111 128'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M21.9221 46.6738L38.8946 56.5744L38.7352 97.903L110.32 55.8668L110.321 74.9617L21.9222 128L21.9221 46.6738ZM68.5979 52.331L55.1613 61.5244L19.0948 42.4304L19.0948 128L-1.73663e-05 118.807L0.000791349 13.4357L68.5979 52.331ZM41.0168 74.2545V93.3486L109.614 53.039L20.5084 0L1.41439 10.6078L74.2546 53.039L41.0168 74.2545Z'
				fill='#0F76FF'
			/>
		</svg>
	);
};

export default BlipLogo;
