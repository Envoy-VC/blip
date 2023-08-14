import React from 'react';

interface Props {
	size?: string;
	color?: string;
	width?: string;
	height?: string;
	props?: React.SVGAttributes<SVGElement>;
}

const LensLogo = ({
	size,
	width = '177',
	height = '177',
	color = '#fff',
	props,
}: Props) => {
	return (
		<svg
			width={size || width}
			height={size || height}
			viewBox='0 0 177 177'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M108.914 71.9026C113.315 68.2308 118.225 66.8338 122.934 67.187C127.957 67.5637 132.605 69.9182 136.077 73.3381C139.548 76.7582 141.933 81.3328 142.315 86.2698C142.7 91.2518 141.032 96.4698 136.634 101.049C136.232 101.471 135.821 101.887 135.401 102.298C115.453 121.948 88.9555 122 88.6844 122H88.6831C88.5476 122 61.966 121.999 41.9665 102.296L41.9622 102.291C41.5493 101.882 41.1427 101.47 40.7422 101.056L40.739 101.052C36.339 96.4767 34.6693 91.26 35.0533 86.278C35.4338 81.3418 37.8171 76.7667 41.2876 73.3454C44.7578 69.9243 49.4056 67.5679 54.4295 67.1896C59.1381 66.835 64.0491 68.2303 68.4523 71.9003C68.9258 66.2398 71.3925 61.8343 74.9732 58.8056C78.7921 55.5753 83.7688 54 88.6832 54C93.5977 54 98.5743 55.5753 102.393 58.8056C105.974 61.8347 108.441 66.241 108.914 71.9026ZM89.5964 120.008L89.5955 119.983L89.5971 119.983L89.5964 120.008ZM87.7701 120.008L87.7694 119.983L87.771 119.983L87.7701 120.008ZM103.67 92.7224C103.124 92.7224 102.935 93.4989 103.283 93.9102C103.899 94.6387 104.27 95.576 104.27 96.5986C104.27 98.919 102.361 100.8 100.006 100.8C97.6505 100.8 95.7411 98.919 95.7411 96.5986C95.7411 96.4745 95.5767 96.4128 95.5024 96.5134C94.8298 97.4235 94.3757 98.4452 94.1891 99.518C94.0841 100.122 93.5857 100.623 92.9594 100.623H92.6135C91.7961 100.623 91.1218 99.9697 91.2424 99.1787C92.0694 93.7577 97.4925 89.826 103.67 89.826C109.847 89.826 115.27 93.7577 116.097 99.1787C116.217 99.9697 115.543 100.623 114.726 100.623C113.908 100.623 113.261 99.9664 113.083 99.1857C112.275 95.6324 108.527 92.7224 103.67 92.7224ZM65.7998 96.5986C65.7998 96.4349 65.5844 96.347 65.483 96.4773C64.764 97.4016 64.2741 98.4484 64.0667 99.5516C63.9443 100.203 63.4062 100.745 62.729 100.745H62.4752C61.6578 100.745 60.9835 100.092 61.104 99.301C61.9306 93.8771 67.3543 89.9483 73.5313 89.9483C79.7082 89.9483 85.1319 93.8771 85.9585 99.301C86.0791 100.092 85.4047 100.745 84.5873 100.745C83.77 100.745 83.1227 100.089 82.9452 99.3081C82.1371 95.7526 78.3892 92.8447 73.5313 92.8447C73.0897 92.8447 72.9281 93.4555 73.2237 93.7764C73.9105 94.5222 74.329 95.5123 74.329 96.5986C74.329 98.919 72.4197 100.8 70.0644 100.8C67.7091 100.8 65.7998 98.919 65.7998 96.5986ZM93.4274 106.731C94.0051 106.165 94.8979 105.89 95.6152 106.273C96.3325 106.657 96.6046 107.547 96.0877 108.167C94.4041 110.184 91.6782 111.463 88.6718 111.463C85.667 111.463 82.9351 110.198 81.2493 108.165C80.7342 107.544 81.0097 106.654 81.7284 106.273C82.4471 105.892 83.3385 106.171 83.9154 106.737C85.0266 107.829 86.7129 108.567 88.6718 108.567C90.6256 108.567 92.3137 107.821 93.4274 106.731Z'
				fill={color}
			/>
		</svg>
	);
};

export default LensLogo;
