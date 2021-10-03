FROM debian:buster

LABEL "com.github.actions.name"="LaTeX linter (chktex)"
LABEL "com.github.actions.description"="Detect stylistic errors in a LaTeX document"
LABEL "com.github.actions.icon"="edit"
LABEL "com.github.actions.color"="yellow"

LABEL "repository"="https://github.com/Dieman89/dissertation"
LABEL "homepage"="https://github.com/Dieman89"
LABEL "maintainer"="Alessandro Buonerba <a.buonerba@hotmail.com>"

RUN apt-get update && apt-get install -y \
  chktex \
  python3.7 \
  python3-pip

WORKDIR /tmp/action
COPY requirements.txt ./
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "/tmp/action/run_action.py" ]
