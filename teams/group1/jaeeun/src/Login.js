import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
    const [interval, setIntervalTime] = useState(60); // 기본값 60초
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

    const fetchApiDataAndSendMessage = async () => {
        try {
            const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
            console.log('Fetching API Data from:', apiEndpoint);  // API 엔드포인트 콘솔에 출력
            const apiResponse = await axios.get(apiEndpoint, {
                headers: { "MAPI-Key": "eyJ1ciI6ImNqZTAzMDciLCJwZyI6ImNpdmlsIiwiY24iOiIycFA0UmpzZFRRIn0.2086fc8e15e040c971144a9382487e90764395292bf99246232a4a18262df1dd" }
            });
            console.log('API Response:', apiResponse.data);

            const logEntry = {
                time: new Date().toLocaleTimeString(),
                message: JSON.stringify(apiResponse.data),
            };
            setLogs((prevLogs) => [...prevLogs, logEntry]);
            
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
                alert('메시지를 성공적으로 보냈습니다.');
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

    const stopInterval = () => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }
    };

    return (
        <Container>
            <Title>Login with Kakao</Title>
            {!accessToken ? (
                <Button onClick={handleLogin}>Login with Kakao</Button>
            ) : (
                <div>
                    <Input
                        type="number"
                        value={interval}
                        onChange={(e) => setIntervalTime(Number(e.target.value))}
                        placeholder="간격을 입력하세요 (초 단위)"
                    />
                    <p>현재 간격: {interval} 초</p>
                    <Button onClick={startInterval}>Start</Button>
                    <Button onClick={stopInterval}>Stop</Button>
                    <LogContainer>
                        {logs.map((log, index) => (
                            <LogItem key={index}>
                                <LogTime>{log.time}</LogTime>
                                <LogMessage>{log.message}</LogMessage>
                            </LogItem>
                        ))}
                    </LogContainer>
                </div>
            )}
        </Container>
    );
};

export default Login;
