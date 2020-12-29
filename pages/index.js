import { useCallback } from 'react';
import Head from 'next/head';
import { Input, Descriptions } from 'antd';
import { useSetState } from 'ahooks';
import { searchUrl } from '../services/index';
import styles from '../styles/index.module.scss';

export default function Home() {
	const [state, setState] = useSetState({
		urlDetails: null,
		loading: false,
	});

	const handleSearch = useCallback(async (url) => {
		if (url) {
			const urlDetails = await searchUrl(
				new URLSearchParams({
					url: encodeURIComponent(url),
				}).toString(),
			).then((res) => res.json());
			console.log(urlDetails);
			setState({ urlDetails });
		}
	});

	const { urlDetails } = state;

	return (
		<section
			className={[
				'flex flex-col flex-1 items-center justify-center h-full p-5',
				styles.container,
			].join(' ')}>
			<Head>
				<title>NN</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Input.Search
				allowClear
				placeholder='输入网址'
				onSearch={handleSearch}
				enterButton
			/>
			{urlDetails && (
				<Descriptions
					title={urlDetails.title}
					bordered
					layout='vertical'
					className='mt-5'>
					<Descriptions.Item label='关键词' span={3}>
						{urlDetails.keywords.join(' ')}
					</Descriptions.Item>
					<Descriptions.Item label='描述' span={3}>
						{urlDetails.description.join(' ')}
					</Descriptions.Item>
					<Descriptions.Item label='一级标题' span={3}>
						{urlDetails.el.h1.join(' ')}
					</Descriptions.Item>
					<Descriptions.Item label='二级级标题' span={3}>
						{urlDetails.el.h2.join(' ')}
					</Descriptions.Item>
					<Descriptions.Item label='三级标题' span={3}>
						{urlDetails.el.h3.join(' ')}
					</Descriptions.Item>
				</Descriptions>
			)}
		</section>
	);
}
