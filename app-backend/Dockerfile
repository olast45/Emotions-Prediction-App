FROM python:3.9.12

RUN mkdir -p /backend

COPY /utils backend/utils
COPY /models backend/models
COPY src /backend/src
COPY pyproject.toml /backend

WORKDIR /backend

ENV PYTHONPATH=${PYTHONPATH}:${PWD}

# Install Poetry
RUN pip3 install poetry

RUN poetry config virtualenvs.create false

RUN poetry install

CMD ["python3", "src/main.py"]

EXPOSE 8000
