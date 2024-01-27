This repo contians code that initializes an automation when a SNOW ticket is approved.

1. The "Send Messages to SNS.JS" file contain JS code that sends the required attributes from the SNOW flow to SNS. - file needs to be changed to match the specific ticket input variables.
2. "Dockerfile" is the file that creates the docker image used to run the "AutomationAgent.py".
3. "AutomationAgent.py" starts automation in jenkins and in ADO.
4. "automation agent launcher.py" is the lambda function code that starts an ECS container in AWS which pulls the docker image from an AWS ECR.
