# Credit Decision Engine

## Introduction

Decision Engine is a robust and user-friendly system designed to empower non-technical individuals to create and deploy decision-making algorithms. The primary aim is to democratize the process of algorithmic decision-making by providing an intuitive drag-and-drop interface for defining decision policies. These policies can then be saved and executed, all without requiring any coding skills.

The architecture comprises four key components:

1. **ConfigFrontend**: A frontend developed in React, providing the graphical user interface where users can design decision policies through a series of blocks.
  
2. **ConfigBackend**: A FastAPI-based backend that handles CRUD operations for the policy configurations. Given that only one policy type is allowed, only Read and Update operations are enabled.

3. **ExecutionEngine**: Another FastAPI-based backend that runs the decision-making policy and returns the result as a JSON object with a boolean field indicating the decision.
  
4. **PolicyDB**: A MongoDB database that stores the policy configurations.

The decision policies can operate on arbitrary variables passed in a JSON format, making it highly adaptable and versatile. For example, a typical input may look like:

```json
{
  "age": 23,
  "income": 3000
}
```

And the output from the ExecutionEngine will be:

```json
{
  "decision": true
}
```

This project aims to satisfy a range of functional and non-functional requirements, which are detailed further in this document.

## How Does It Work

The Decision Engine operates by interconnecting four main components, each with its specific role in the decision-making process.

### ConfigFrontend

When a user accesses the ConfigFrontend, they are presented with a graphical interface where they can design a decision-making policy. Using a series of drag-and-drop blocks, users can build a policy by configuring conditions based on the input variables. For example, a policy could be designed to evaluate if `age > 18` and `income > 1000`.

### ConfigBackend

Once the user saves a policy on the frontend, the ConfigBackend stores this configuration in PolicyDB. The backend supports only reading and updating the policy, as only one type of policy is allowed in the current system setup.

### PolicyDB

This MongoDB database stores the user-defined policy configurations. The data model is structured to hold the policy logic as well as any meta-information required for execution.

### ExecutionEngine

When a request is received from a client system (CustomerBackend), the ExecutionEngine fetches the current policy from PolicyDB. It then executes this policy using the input variables supplied in the JSON payload. After the decision-making process is complete, it returns a JSON object with a boolean `decision` field.

The policy update from ConfigFrontend to ExecutionEngine takes effect in less than 10 seconds, ensuring a seamless experience for the end-users.

### Example Flow

#### Step 1: Policy Creation/Update in ConfigFrontend

1. **Access ConfigFrontend**: A user logs into the frontend interface to design or update a decision-making policy.
   
2. **Drag and Drop Nodes**: The user drags 'Decision Nodes' and 'End Nodes' onto the canvas.

    - **Decision Nodes**: These have three configurables:
        1. Attribute Dropdown: Users select an attribute like 'Age' or 'Income'.
        2. Operator Dropdown: Users select an operator like '>', '<=', etc.
        3. Value Input: Users input a numerical value for comparison.

    - **End Nodes**: These have a single configurable dropdown to select either 'True' or 'False' as the decision outcome.
   
3. **Connect Nodes**: Users can then connect the 'Decision Nodes' and 'End Nodes' using edges. Each 'Decision Node' has two outs: 'True' and 'False'. Users link these outs to the next node in the flowchart, determining the decision path.

4. **Save Policy**: After completing the design, the user hits the 'Save' button. The frontend performs validation to ensure all nodes are properly connected and configured. Upon successful validation, it patches the existing policy via a call to ConfigBackend, which then stores the updated policy in PolicyDB.

#### Step 2: Policy Execution

1. **CustomerBackend Request**: A JSON object with arbitrary fields is sent to the ExecutionEngine.

```json
{
  "age": 30,
  "income": 4500
}
```

2. **Fetch and Transform Policy**: ExecutionEngine makes a call to ConfigBackend to fetch the latest policy. It then transforms the nodes structure into a decision tree.

3. **Policy Evaluation**: The decision tree is evaluated using the input variables from the CustomerBackend's JSON payload.

4. **Decision Output**: A JSON object with the decision is returned.

```json
{
  "decision": true
}
```

## Tech Stack

This project leverages various technologies, each carefully chosen to meet specific requirements and functionalities.

### Python

The language of choice for this project is Python for several reasons:

- **Project Requirement**: One of the project's specifications was a strong preference for Python.
  
- **Rapid Development**: Python's straightforward syntax and extensive libraries enable quick development, a key factor in meeting project deadlines.

- **Prior Experience**: My background in Python significantly influenced this choice, allowing me to focus more on the logic and features rather than the language specifics.

### FastAPI (ConfigBackend and ExecutionEngine)

FastAPI was selected over alternatives like Django and Flask for multiple reasons:

- **Microservices**: The decision to separate ConfigBackend from ExecutionEngine is rooted in the microservices architecture, which allows for easier scaling and maintenance. FastAPI is particularly well-suited for quickly developing such microservices.

- **Lightweight**: FastAPI is lighter than most other frameworks, making it faster and more efficient to run.

- **Performance**: Being built on Starlette and Pydantic, FastAPI offers high performance, crucial for user experience, especially in Execution Engine requirements.

- **Type Checking**: FastAPI's use of Pydantic ensures automatic model validation, which simplifies data validation and consistency.

- **Automatic Documentation**: Unlike Django and Flask, FastAPI provides auto-generated Swagger and ReDoc interfaces out-of-the-box, a pivotal feature for serving as the UI for the ExecutionEngine.

### React (ConfigFrontend)

The frontend uses React for the following reasons:

- **Prior Familiarity**: My previous experience with React made it a natural choice for this project.

- **Drag-and-Drop Libraries**: React's extensive ecosystem includes several libraries that facilitate implementing drag-and-drop features.

- **Community and Ecosystem**: The large community and numerous third-party libraries in React speed up the development process.

### MongoDB (PolicyDB)

MongoDB's JSON-like document handling, schema flexibility, and scalability make it ideal for our PolicyDB:

- **Schema Flexibility**: MongoDB's lack of a fixed schema is beneficial for accommodating evolving policy structures.
  
- **Scalability**: MongoDB is horizontally scalable, future-proofing it against increased policy complexity or user numbers.

### Docker

Docker was integrated into this project not as a strict requirement, but as a means to fulfill the project's emphasis on ease of setup and management:

- **Ease of Setup and Distribution**: Docker containers package up everything an application needs to run, streamlining distribution and eliminating inconsistencies across various runtime environments.

- **Microservices Management**: In a microservices architecture like ours, Docker-compose simplifies the orchestration of all services (`backend-config`, `frontend-config`, `execution-engine`), allowing you to control the entire application stack through simple commands.

- **Users's Convenience**: The usage of Docker ensures that any other user can effortlessly set up the entire system and run tests, without having to manually manage the setup and dependencies for each individual service.


## Getting Started

This section provides a quick start guide on how to get the project up and running on your local machine.

### Project Structure

Here is a simplified structure of the project to help you understand its organization:


### Environment Variables

0. Clone this project.
1. Navigate to each of the `backend-config`, `execution-engine`, and `frontend-config` folders.
2. Make a copy of the `.env.example` file in each folder and rename it to `.env`.

    ```
    cp .env.example .env
    ```

3. The only incomplete variable in the `.env.example` file is `DB_URL`. You'll need to set up a MongoDB instance on Atlas and use the connection URL to populate this field. **Alternatively, you can reach out to me for a test database URL.**

### Setting up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create an account if you don't have one.
2. Create a new cluster and retrieve the connection URL.
3. Create a database called `PolicyDB` and a collection called `policies`
3. Replace the `DB_URL` in the `.env` files with the URL you've just obtained.

### Running the Project using Docker

1. Make sure you have Docker and Docker Compose installed on your machine.
2. Open a terminal and navigate to the root directory containing the `docker-compose.yml` file.
3. Run the following command to start all the services defined in `docker-compose.yml`:

    ```
    docker-compose up
    ```

4. Once the services are up and running, you can access the frontend at `http://localhost:3000` (this is the `PORT` port number defined in the `.env` file for the frontend-config service).
