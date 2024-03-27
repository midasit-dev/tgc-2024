import pandas as pd

# 문자열 보조 함수
class StringSupport:
	@staticmethod
	# 줄을 바꿉니다
	def enter():
		print('')

	# 구분선을 출력 합니다.
	def liner():
		print('--------------------------------------------------------')

	# 문자열을 입력 받아 공백을 제거 합니다.
	def strip(value):
		return value.strip()
	
# Error 처리를 위한 객체를 생성 합니다.
class ErrorMessage(Exception):
	def __init__(self, message):
		self.message = message

# JSON 데이터를 테이블 형태로 출력 합니다.
def print_json_table(json_data):
	df = pd.DataFrame.from_dict({(i,j): json_data[i][j] 
																for i in json_data.keys() 
																for j in json_data[i].keys()},
																orient='index')
	print(df)