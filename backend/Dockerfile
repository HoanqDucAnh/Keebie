FROM python:3.11-alpine
WORKDIR /app/backend
COPY ./requirements.txt ./
RUN --mount=type=cache,target=/root/.cache/pip pip install -r requirements.txt
COPY . .
RUN mkdir -p ../frontend/build/static
EXPOSE 8000
CMD ["python", "main.py"]