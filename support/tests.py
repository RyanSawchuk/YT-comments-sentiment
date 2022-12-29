from afinn import Afinn

afinn = Afinn(language='en')

score = afinn.score("Bob is a Positively Inspirational and Motivating Person!")

print(score)

'https://raw.githubusercontent.com/fnielsen/afinn/master/afinn/data/AFINN-111.txt'