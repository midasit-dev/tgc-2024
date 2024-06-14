import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import moaui from '@midasit-dev/moaui';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${window.location.origin}/oauth`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f7f7;
`;

const Title = styled.h1`
  color: #333;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  background-color: #ffeb00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const LogContainer = styled.div`
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const LogItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const LogTime = styled.div`
  font-size: 12px;
  color: #888;
`;

const LogMessage = styled.div`
  font-size: 14px;
  color: #333;
`;

const Login = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [logs, setLogs] = useState([]);
    const [interval, setIntervalTime] = useState(15); // 기본값 15초
    const [title, setTitle] = useState('Login with Kakao');
    const intervalIdRef = useRef(null);
    
    useEffect(() => {
        const handleAuth = async () => {
            const url = new URL(window.location.href);
            const code = url.searchParams.get('code');
            console.log('Authorization Code:', code);  // 인증 코드를 콘솔에 출력

            if (code) {
                const data = {
                    grant_type: 'authorization_code',
                    client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
                    redirect_uri: `${window.location.origin}/oauth`,
                    code: code,
                };

                try {
                    const response = await axios.post('https://kauth.kakao.com/oauth/token', data, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });
                    console.log('Token Response:', response.data);  // 토큰 응답을 콘솔에 출력
                    setAccessToken(response.data.access_token);
                    setTitle("Login successful!");
                } catch (error) {
                    console.error('Error getting token', error.response ? error.response.data : error.message);
                }
            }
        };

        handleAuth();

        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.REACT_APP_KAKAO_REST_API_KEY);
        }
    }, []);

    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    };

    const stopInterval = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }
    };

    const fetchApiDataAndSendMessage = async () => {
        try {
            const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
            console.log('Fetching API Data from:', apiEndpoint);  // API 엔드포인트 콘솔에 출력
            const apiResponse = await axios.get(apiEndpoint, {
                headers: { "MAPI-Key": "eyJ1ciI6ImtoZDA4MTFAbWlkYXNpdC5jb20iLCJwZyI6ImNpdmlsIiwiY24iOiJmSkVKY3I5alR3In0.e7a443214757197180de5da24b422478da114452c3b71d09f42842967abece0a" }
            });
            console.log('API Response:', apiResponse.data);

            const analysisStatus = apiResponse.data.ANAL_STATUS;
            const lastStage = analysisStatus[analysisStatus.length - 1];
            const lastStageName = lastStage.STAGE;
            const lastStageStatus = lastStage.STATUS;
            const lastStageProgress = lastStage.PROGRESS;

            console.log('Last Stage:', lastStageName);
            console.log('Status:', lastStageStatus);
            console.log('Progress:', lastStageProgress);

            // const logEntry = {
            //     time: new Date().toLocaleTimeString(),
            //     message: JSON.stringify(apiResponse.data),
            // };
            const logEntry = {
                time: new Date().toLocaleTimeString(),
                Stage: lastStageName,
                Status: lastStageStatus,
                Progress: lastStageProgress,
            };
            setLogs((prevLogs) => [...prevLogs, logEntry]);

            // 해석이 완료되면 Interval 종료
            if (lastStageName === "Post-mode") {
                stopInterval();
                sendKakaoMessage("해석이 완료되었습니다.");
            }

            sendKakaoMessage(apiResponse.data);
        } catch (error) {
            console.error('Error fetching API data', error);
        }
    };

    const sendKakaoMessage = (data) => {
        if (!accessToken) return;

        window.Kakao.Auth.setAccessToken(accessToken);

        window.Kakao.API.request({
            url: '/v2/api/talk/memo/default/send',
            data: {
                template_object: {
                    object_type: 'text',
                    text: `API 호출 결과: ${JSON.stringify(data)}`,
                    link: {
                        web_url: 'http://www.naver.com',
                        mobile_web_url: 'http://www.naver.com',
                    },
                },
            },
            success: (response) => {
                console.log('Message sent successfully:', response);
                //alert('메시지를 성공적으로 보냈습니다.');
            },
            fail: (error) => {
                console.error('Error sending message:', error);
                alert(`메시지를 보내지 못했습니다. 오류 메시지: ${JSON.stringify(error)}`);
            },
        });
    };

    const startInterval = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }
        intervalIdRef.current = setInterval(fetchApiDataAndSendMessage, interval * 1000);
    };

    const ComponentsDropListDropdown = ({ onValueChange }) => {
        const [value, setValue] = useState(15);
    
        function onChangeHandler(event) {
            const newValue = parseInt(event.target.value, 10);
            setValue(newValue);
            onValueChange(newValue); // 선택된 값을 부모 컴포넌트로 전달
        }
    
        const items = new Map([
            ['15', 15],
            ['30', 30],
            ['60', 60],
            ['120', 120]
        ]);
    
        return (
            <moaui.DropList 
                itemList={items} 
                width="100px" 
                value={value}
                onChange={onChangeHandler}
            />
        );
    }

    const handleDropListChange = (value) => {
        console.log('Interval value:', value); // interval 값 로그 출력
        setIntervalTime(Number(value)); // 선택된 값을 interval 변수에 설정
    };

    return (
        <Container>
            <moaui.GuideBox show spacing={5} center fill="1" width={320} height={640}>
                <moaui.Typography variant='h1' size='large'>{title}</moaui.Typography>

                {!accessToken ? (
                    <moaui.Button color="negative" onClick={handleLogin}>Login with Kakao</moaui.Button>
                ) : (
                    <div>
                        <moaui.GuideBox spacing={1} center fill="1">
                            {/* <Input
                                type="number"
                                value={interval}
                                onChange={(e) => setIntervalTime(Number(e.target.value))}
                                placeholder="간격을 입력하세요 (초 단위)"
                            /> */}
                            <moaui.Typography variant='h2'>Enter API transmission interval.</moaui.Typography>
                            <ComponentsDropListDropdown onValueChange={handleDropListChange} />
                            <moaui.Typography variant='h2'>현재 간격: {interval} 초</moaui.Typography>
                            <moaui.Stack direction='row' spacing={1}>
                                <moaui.Button color="negative" onClick={startInterval}>Start</moaui.Button>
                                <moaui.Button color="negative" onClick={stopInterval}>Stop</moaui.Button>
                            </moaui.Stack>
                            {/* {<moaui.DataGrid
                                {logs.reverse().map((log, index) => (
                                    <LogItem key={index}>
                                        <LogTime>{log.time}</LogTime>
                                        <LogMessage>{log.message}</LogMessage>
                                    </LogItem>
                                ))}
                            />} */}
                            {/* {<moaui.DataGrid
                                checkboxSelection
                                columns={[
                                    { field: 'id', headerName: 'ID', width: 70 },
                                    { field: 'stage', headerName: 'Stage', width: 150 },
                                    { field: 'status', headerName: 'Status', width: 150 },
                                    { field: 'progress', headerName: 'Progress', width: 150 },
                                ]}
                                rows={logs}
                                pageSizeOptions={[5]}
                                initialState={{
                                    pagination: {
                                        paginationModel: { pageSize: 5 }
                                    }
                                }}
                            />} */}
                        </moaui.GuideBox>
                    </div>
                )}
            </moaui.GuideBox>
        </Container>
    );
};

export default Login;
