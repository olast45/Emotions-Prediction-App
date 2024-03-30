import re
import nltk

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

nltk.download('all', quiet=True)

def clean_data(text: str) -> str:

  # Converting all characters to lowercase
  text = text.lower()

  # Removing links
  text = re.sub('https?://\S+|www\.\S+', '', text)

  # Removing HTML tags
  text = re.sub('<[^<]+?>', '', text)

  # Removing usernames
  text = re.sub('@[^\s]+', ' ', text)

  # Removing words that contain digits (ex. h3llo)
  text = re.sub('\w*\d\w*', '', text)

  # Removing single characters
  text = re.sub(r'\b\w\b', '', text)

  # Removing everything except letters from the text - it includes removing punctuation, digits, special characters
  text = re.sub(r'[^a-z\s]', ' ', text).strip()

  # Removing whitespace
  text = " ".join(text.split())

  # Removing newline characters
  text = re.sub('\n', '', text)


  return text


def remove_stopwords_and_lemmatize(text: str) -> str:

    # Tokenize the text
    tokens = word_tokenize(text)

    # Remove stop words
    filtered_tokens = [token for token in tokens if token not in stopwords.words('english')]

    # Lemmatize the tokens
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in filtered_tokens]


    # Join the tokens back into a string
    processed_text = ' '.join(lemmatized_tokens)

    return processed_text