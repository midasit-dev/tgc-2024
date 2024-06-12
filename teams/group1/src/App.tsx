/**
 * 
 * ██████╗        █████╗ ██████╗ ██████╗ 
 * ╚════██╗      ██╔══██╗██╔══██╗██╔══██╗
 *  █████╔╝█████╗███████║██████╔╝██████╔╝
 *  ╚═══██╗╚════╝██╔══██║██╔═══╝ ██╔═══╝ 
 * ██████╔╝      ██║  ██║██║     ██║     
 * ╚═════╝       ╚═╝  ╚═╝╚═╝     ╚═╝     
 * 
 * @description Entry point for the application after Wrapper
 * @next last entry point
 */

import React from 'react';
import moa, { 
	GuideBox, 
	Panel,
} from '@midasit-dev/moaui';
import { default as WelcomeDevTools } from './DevTools/Welcome';
import { dbRead } from './utils_pyscript';
const opacity = 0.5;
//If you want to test, try using the GuideApp component.
//import GuideApp from './SampleComponents/GuideApp';

/**
 * You can modify the code here and test.
 * 
 * @description You can start from the Panel Component below.
 * 							You can add the Component you want.
 *							You can check the version of the library you are currently using by opening the developer tool.
 * 
 * For more information about the library, please refer to the link below.
 * @see https://midasit-dev.github.io/moaui
 */
const App = () => {
	return (
		<GuideBox width={500} height={300} spacing={2} padding={2} center>
			<moa.Typography variant='h1'>카카오톡으로 로그인 하세여</moa.Typography>
			<moa.Button 
				color="negative"
				onClick={() => {
					window.location.href = 'https://www.naver.com';
				}}
			>로그인</moa.Button>
			<moa.Button
				onClick={() => {
					const NODE = dbRead('NODE');
					console.log(NODE);
				}}
			>NODE 가져오기</moa.Button>
		</GuideBox>
	);
}

export default App;