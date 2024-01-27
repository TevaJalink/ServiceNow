FROM ubuntu:servicenow-agent

RUN apt update
RUN apt upgrade -y
RUN apt install python3 pip
RUN pip install requests python-jenkins 

WORKDIR /agent

COPY ./AutomationAgent.py ./

CMD ["python3", "./AutomationAgent.py"]