FROM python:3.9.6-slim

WORKDIR /app

COPY . /app

RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["python3", "app.py"]
