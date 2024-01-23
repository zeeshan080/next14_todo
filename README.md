# Nextjs 14 with FastApi and neon postgres database

# Frontend Nextjs 14

```
clone https://github.com/zeeshan080/next14_todo
npm i
```

# FastAPI integration

## STEP 00 Create virtual Environment using conda and install

* Open conda prompt and type

```
conda create -n fastapinext python=3.11.5
conda activate fastapinext
```

- Install these packages in it

```
pip install fastapi
pip install uvicorn
pip install httpie
pip install pytest
```

1. `fastapi` for using fastapi inside nextjs
2. `uvicorn` to run the local server
3. `httpie` to test our api endpoints in terminal
4. `pytest` to write test cases for your application

## STEP 01 In root add folder `api/index.py` and add code

```
from fastapi import FastAPI

app = FastAPI()

@app.get("/api/status")
def next_app():
    return {"message": "from nextjs api"}

@app.get("/todo")
def next_app():
    return {"message": "all todos"}

@app.post("/todo")
def next_app(todo):
    return {"message": "todo added successfully"}

@app.put("/todo")
def next_app(todo,todo_id):
    return {"message": "todo updated successfully"}

@app.delete("/todo")
def next_app(todo_id):
    return {"message": "todo deleted successfully"}

```

## 03 In the next.config.js file replace all the code with below code

> [!IMPORTANT]  
> This is very important step.

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            : "/api/",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/docs"
            : "/api/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/openapi.json"
            : "/api/openapi.json",
      },
    ];
  },
};

module.exports = nextConfig;
```

## 04 Run the application

- open terminal activate your virtual environment then run

```
npm run dev
```

> This will start you nextjs development server at `localhost:3000`

- Now in a new terminal run this command

```
uvicorn api.index:app --reload
```

> This will start you fastapi uvicorn development server at `localhost:8000`

## 05 Test the applicaion using httpie

### open a new terminal window write following command

```
http localhost:8000/status
```

> OUTPUT

```
HTTP/1.1 200 OK
content-length: 35
content-type: application/json
date: Thu, 04 Jan 2024 19:49:39 GMT
server: uvicorn

{
    "messge": "from nextjs api"
}

```

> This validates that our uvicorn server is working fine

### Now for the nextjs api test

```
http localhost:3000/api/status
```

> OUTPUT

```
HTTP/1.1 200 OK
Vary: Accept-Encoding
connection: close
content-length: 29
content-type: application/json
date: Thu, 04 Jan 2024 19:52:00 GMT
server: uvicorn

{
    "message": "from nextjs api"
}
```

> This validates that our nextjs api is working fine

## STEP 05 To run code on Vercel

- First you need to have a `requirements.txt` file which will help in vercel to install packages to use

```
pip freeze > requirements.txt
```

- We will use concurrently package to run uvicorn and next server together

```
npm install concurrently
```

- Replace scripts at the of your package.json file by the below code

```
 "scripts": {
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "fast-dev": "uvicorn -api.index:app --reload",
    "next-dev": "next dev",
    "dev": "pip install -r requirements.txt concurrently \"npm run next-dev\" \"npm run fast-dev\""
  },
```

> Now when you run `npm run dev` your nextjs and uvicorn both server will start in one termial side by side


# Database Integration Installing sqlalchemy and attaching noen postgresSQL

## STEP 06: Install the packages in python virtual envoriment

```
pip install psycopg2
pip install sqlalchemy
pip install alembic
pip install python-dotenv
```
1. ```psycopg2``` needed by sqlalchemy
2. ```sqlalchemy``` for ORM to create tables and database queries
3. ```alembic``` for auto migrations
4. ```python-dotenv``` load env variables

## STEP 07: Create folder ```database/db.py```
* Add the below lines to create connection with you database after you have pasted the connection link in the ```.env``` file in root
```
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv,find_dotenv
import os

load_dotenv(find_dotenv())
engine = create_engine(str(os.getenv("POSTGRES_URL")))
# Create a session factory
SessionLocal = sessionmaker(bind=engine)

# Dependency
def get_db():
    with SessionLocal() as session:
        yield session

```

## STEP 08: Creating Tables for the database in ```database/models.py``` file
* Create a models.py file inside the database folder and add the starter code in it
```
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, select, update, delete
from typing import List, Dict, Union
from database.db import Session

class BaseModel(DeclarativeBase):
    pass

class User(BaseModel):
    pass

class Todo(BaseModel):
    pass
```

## STEP 09: Create a ```database/run_migrations.py``` file 
* Inside your database folder create a run_migrations file you can name it whatever you want and paste the below code
```
import sys
from dotenv import load_dotenv
from alembic.config import Config
from alembic import command
import os
# Load environment variables from .env
load_dotenv()
postgres_url = os.getenv("POSTGRES_URL")
# Create an Alembic configuration object
alembic_cfg = Config("alembic.ini",config_args={"sqlalchemy.url":postgres_url})

# Check for migration message and optional revision
if len(sys.argv) < 2:
    print("Please provide a migration message.")
    sys.exit(1)

migration_message = sys.argv[1]

revision = sys.argv[2] if len(sys.argv) >= 3 else 'head'

# Run the revision command with a message
command.revision(alembic_cfg, message=migration_message,autogenerate=True)

command.upgrade(alembic_cfg, "head")

```

## STEP 10: Creating auto migrations using alembic
* Run the below command in terminal inside your database folder to create alembic file
```
cd database
alembic init alembic
```
* We need to change few things in the file in other to run auto migrations

1. ```env.py``` file uncomment the below lines
```
19. from model import BaseModel
20. target_metadata = BaseModel.metadata
21. #target_metadata = None comment out this line
```

2. ```alembic.ini``` file comment the below line
```
64. #sqlalchemy.url = driver://user:pass@localhost/dbname
```
3. Now simply run the command in  the terminal you can write anything you like in your comit message
```
python run_migrations.py "created todo and user table"
```

* Now your database should have been created in the noen dashboard