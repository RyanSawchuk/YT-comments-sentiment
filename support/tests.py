from afinn import Afinn

afinn = Afinn(language='en')

score = afinn.score("Bob is a Positively Inspirational and Motivating Person!")

print(score)

'https://raw.githubusercontent.com/fnielsen/afinn/master/afinn/data/AFINN-111.txt'

'https://github.com/nealcaren/osscabd_2018/blob/master/notebooks/data/nyt_201704_comments.json?raw=true'