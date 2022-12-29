import pandas as pd
import json
import math

from afinn import Afinn
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.stem import PorterStemmer


def vader():
    curratedWordlist = dict()

    with open('wordlists/vader_wordlist.txt', 'r') as f:
        for line in f:
            tokens = line.split('\t')
            curratedWordlist[tokens[0]] = tokens[1]
    
    write_to_json('wordlist.json', curratedWordlist)


def afinn():
    pass


def LoughranMcDonald():
    wordlist = pd.read_csv('LoughranMcDonald_MasterDictionary_2018.csv').sort_values(by=['Word'])

    curratedWordlist = dict()

    wnl = WordNetLemmatizer()
    ps = PorterStemmer()
    afinn = Afinn(language='en')

    p = 0
    n = 0
    nn = 0

    for row in wordlist.iterrows():
        word = ps.stem(wnl.lemmatize(str(row[1]['Word']).lower()))

        if word not in curratedWordlist.keys():
            scalar = 1

            if int(row[1]['Positive']) > 0:
                p +=1
                pass
            if int(row[1]['Negative']) > 0:
                n += 1
                scalar = -1
            else:
                nn += 1
                #continue
                pass
            
            weight = (int(row[1]['Doc Count'])) / (int(row[1]['Word Count']) + 1) * scalar

            curratedWordlist[word] = weight
            print(word, afinn.score(word), weight)

    print(p, n, nn)


def write_to_json(filename, object):
    with open(filename, "w") as outfile:
        json.dump(object, outfile)

vader()