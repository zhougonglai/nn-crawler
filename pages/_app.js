import '../styles/globals.scss';
import { ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';
import moment from 'moment';
import styles from '../styles/_app.module.scss';

const { Header, Footer, Sider, Content } = Layout;
moment.locale('zh-cn');

function MyApp({ Component, pageProps }) {
	return (
		<ConfigProvider local={zhCN}>
			<Layout className='flex flex-col min-h-screen'>
				<Header>
					<div className={styles.title}>NN爬虫</div>
					<link
						href='https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
						rel='stylesheet'></link>
				</Header>
				<Content className='flex-1'>
					<Component {...pageProps} />
				</Content>
			</Layout>
		</ConfigProvider>
	);
}

export default MyApp;
