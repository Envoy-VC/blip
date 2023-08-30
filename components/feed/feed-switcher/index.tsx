import React from 'react';
import { Select, ConfigProvider } from 'antd';
import {
	ProfileId,
	useSearchProfiles,
	useProfile,
	profileId,
} from '@lens-protocol/react-web';
import { ProfileAvatar } from '@/components/common';
const { Option } = Select;

interface Props {
	feedProfileId: ProfileId;
	setFeedProfileId: React.Dispatch<React.SetStateAction<ProfileId>>;
}

const FeedSwitcher = ({ feedProfileId, setFeedProfileId }: Props) => {
	const [value, setValue] = React.useState<string>('');
	const { data: profile } = useProfile({ profileId: feedProfileId });
	const { data, loading } = useSearchProfiles({ query: value });

	const handleChange = (newValue: string) => {
		setValue(newValue);
	};

	const handleSelect = (value: string) => {
		if (value === '') return;
		setFeedProfileId(profileId(value));
	};

	return (
		<div className='flex flex-row items-center gap-2'>
			<span className='font-sans text-[1rem] font-medium'>View feed for</span>
			<ConfigProvider
				theme={{ token: { controlOutline: 'none', colorPrimaryHover: 'none' } }}
			>
				<Select
					showSearch
					style={{ width: 200 }}
					placeholder='stani'
					defaultValue={profile?.name || profile?.handle || ''}
					optionFilterProp='children'
					value={profile?.id || ''}
					filterOption={false}
					onSearch={handleChange}
					onChange={handleChange}
					onSelect={(value: string) => {
						localStorage.setItem('feedProfileId', value);
						handleSelect(value);
					}}
					size='large'
				>
					{!!profile && (
						<Option value={profile?.id}>
							<div className='flex flex-row items-center gap-2'>
								<ProfileAvatar picture={profile?.picture || null} size={24} />
								<span className='truncate text-[1rem] font-medium'>
									{profile?.name || profile.handle}
								</span>
							</div>
						</Option>
					)}
					{!!data &&
						data.map((profile, index) => (
							<Option key={index} value={profile?.id}>
								<div className='flex flex-row items-center gap-2'>
									<ProfileAvatar picture={profile?.picture || null} size={24} />
									<span className='truncate text-[1rem] font-medium'>
										{profile?.name || profile.handle}
									</span>
								</div>
							</Option>
						))}
				</Select>
			</ConfigProvider>
		</div>
	);
};

export default FeedSwitcher;
