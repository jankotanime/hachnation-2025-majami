FROM python:latest

WORKDIR app/

COPY . .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["flask", "--app=app", "run", "--host=0.0.0.0"]