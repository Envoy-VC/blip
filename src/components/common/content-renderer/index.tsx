import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import ProfileTooltip from './profile-tooltip';

interface Props {
	children: React.ReactNode;
	showFull?: boolean;
}

const ContentRenderer = ({ children, showFull = true }: Props) => {
	const parseContentForMentions = (content: string) => {
		const re = /(^|\s)@([A-z/0-9]+).lens\b/gi;
		const lensprotocolMention = /(^|\s)@lensprotocol\b/gi;
		content = content.replace(lensprotocolMention, ' <mark>@lensprotocol</mark>');
		return content.replace(new RegExp(re), ' <mark>@$2</mark>');
	};
	return (
		<ReactMarkdown
			components={{
				mark({ children }) {
					return <ProfileTooltip>{children}</ProfileTooltip>;
				},
			}}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			rehypePlugins={[rehypeRaw as any]}
		>
			{showFull
				? parseContentForMentions(children as string)
				: parseContentForMentions(children as string).slice(0, 200)}
		</ReactMarkdown>
	);
};

export default ContentRenderer;
