import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import ReactMarkdown from 'react-markdown';
import 'katex/dist/katex.min.css'
import { GuideBox } from '@midasit-dev/moaui';

const test = `*MEMBER NAME : BP1*
===================

# 1. 일반 사항
  
설계 기준 : KDS 41 30 2022  
기준 단위계 : N, mm
# 2. 재질
  
베이스 플레이트 : SS275 ( F_y = 275 N/mm^2 )  
앵커 볼트 : KS-B-1016-4.6  
콘크리트 : 24
# 3. 단면
  
기둥 : H-Beam 300x300x10x15  
베이스 플레이트 : 240x240x15.0x15.0(사각형)  
앵커 볼트 : 2-M20
# 4. 설계 부재력
  
$P_{u}$ = 1.47 kN  
$M_{ux}$ = 7.968578239999999 kN.m  
$M_{uy}$ = 13.5 kN.m  
$V_{ux}$ = 1.48 kN  
$V_{uy}$ = 0.97 kN
# 5. 베이스 플레이트의 지압 응력 검토


(1) 지압 응력  
$f_{max}$ = None kN  
$f_{min}$ = None kN  
$σ_{max}$ = 1 MPa  
$σ_{min}$ = 1 MPa  


(2) 콘크리트의 지압 응력 계산  
ø = 0.65  
$A_1$ = 250000 $mm^2$  
$A_2$ = 1000000 $mm^2$  
$F_n = 0.85 f_ck \\sqrt{\\frac{A_2}{A_1}}$ = 40.8 MPa  
$øF_n$ = 26.52 MPa

(3) 강도비  
$σ_{max}/øF_n$ = 0.03770739064856712 
# 6. 앵커 볼트의 인장 응력 검토


(1) 인장력  
$T_{u,max}$ = None kN  
$T_{u,min}$ = None kN

(2) 인장 강도 검토  
ø = 0.75  
$F_{nt}$ = 300 MPa  
$A_b$ = 0.7853981633974483 $mm^2$  
$R_{nt}$ = 235.61944901923448 kN  
$øR_{nt}$ = None kN

(3) 강도비  
$T_{u,max}/øR_{nt}$ = 0.005658842421045168 
# 7. 베이스 플레이트의 검토


(1) 설계 모멘트  
$M_{ux}$ = None kN.m  
$M_{uy}$ = None kN.m  
$M_u = max( M_{ux}, M_{uy})$ = None kN.m

(2) 모멘트 강도 계산  
$ø$ = 0.9   
$Z_{bp} = t_{bp}^2 / 4$ = 36 $mm^3$  
$M_n = F_y Z_{bp}$ = 36 kN.m  
$øM_n$ = 32.4 kN.m

(3) 강도비 계산  
$M_u / øM_n$ = 0.24594377283950616 
# 8. 앵커 볼트 검토


(1) 설계 부재력  
앵커 볼트의 개수 = NoneEA  
$T_{u,max}$ = None kN  
$V_u$ = None kN  
$V_{u,1}$ = 1.48 kN

(2) 전단 강도 검토  
$ø$ = 0.75   
$A_b$ = 0.7853981633974483 $mm^2$  
$F_{nv}$ = 160 MPa  
$R_{nv}$ = 125.66370614359172 kN  
$øR_{nv}$ = 176.71458676442586 kN  
$V_u1 / øR_{nv}$ = 0.015703287718400342 

(3) 인장 강도 검토  
$ø$ = 0.75   
$A_b$ = 0.7853981633974483 $mm^2$  
$F_{nt}$ = 300 MPa  
$f_v = V_{u1} / A_b$ = 1.8843945262080408 MPa  
$F_{nt}'$ = 300 MPa  
$R_{nt} = F_{nt'} A_b$ = 235.61944901923448 kN  
$øR_{nt}$ = None kN  
$T_{u,max}/øR_{nt}$ = None 
# 9. 앵커 볼트 정착 길이 검토


(1) 갈고리형 철근의 정착 길이 검토  
$ø$ = 0.75   
$L_{anc}$ = 1 mm  
$T_{anc} = øF_{anc} A_{anc}$ = None kN  
$L_{h1} = (T_{anc}/2) / (0.7f_{ck} d_{anc})$ = None mm  
$L_{h2} = 12 d_{anc}$ = None mm  
$L_{req} = L_{h1} + L_{h2}$ = None mm  
$L_{req} / L_{anc}$ = 17.2593627013222 `

export default function MDReport({ mdData = "" }) {
  return(
		<GuideBox>
			<ReactMarkdown
				remarkPlugins={[remarkMath]}
				rehypePlugins={[rehypeKatex]}
			>
				{test}
			</ReactMarkdown>
			<style>
				{`
					h1 {
						font-size: 1.5rem;
						font-weight: 600;
					}

					h2 {
						font-size: 1.25rem;
						font-weight: 600;
					}

					h3 {
						font-size: 1.125rem;
						font-weight: 600;
					}

					h4 {
						font-size: 1rem;
						font-weight: 600;
					}

					h5 {
						font-size: 0.875rem;
						font-weight: 600;
					}

					h6 {
						font-size: 0.75rem;
						font-weight: 600;
					}

					p {
						font-size: 0.8rem;
					}

					ul {
						font-size: 0.8rem;
					}

					br {
						margin: 1;
					}
				`}
			</style>
		</GuideBox>
  )

}