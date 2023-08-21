import React from 'react';
import { Tooltip } from 'antd';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import ProfileTooltip from './profile-tooltip';

interface Props {
	children: React.ReactNode;
}

const ContentRenderer = ({ children }: Props) => {
	const parseContentForMentions = (content: string) => {
		const re = /(^|\s)@([A-z]+)\b/gi;
		return content.replace(new RegExp(re), ' <a>@$2</a>');
	};
	return (
		<ReactMarkdown
			components={{
				a({ node, className, children, ...props }) {
					return <ProfileTooltip>{children}</ProfileTooltip>;
				},
			}}
			rehypePlugins={[rehypeRaw]}
		>
			{parseContentForMentions(children as string)}
		</ReactMarkdown>
	);
};

export default ContentRenderer;
