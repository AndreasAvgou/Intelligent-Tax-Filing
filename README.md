# Intelligent Tax Filing


The Intelligent Tax Filing is a sophisticated full-stack web application designed to provide AI-driven tax assistance. It leverages modern frameworks and generative AI to offer users personalized tax advice based on their financial data.

---

## Key Features 

Τhe following features have been implemented:

* **Generative AI Tax Advice**: Integrated OpenAI GPT-4o model that analyzes user financial data to provide intelligent tax filing assistance.
* **Precision Calculation Engine**: Server-side logic built to handle complex tax information including income and expenses.
* **Responsive User Interface**: A modern, mobile-friendly landing page and intuitive forms developed with React.
* **Full Internationalization**: Native support for English and Greek languages, allowing for dynamic language switching.
* **Bilingual AI Strategy**: A specialized prompting system that delivers AI insights in both languages simultaneously to ensure zero-latency UI updates.
* **Advanced Accessibility**: Built-in Dark Mode support and interactive UI components for an optimal user experience.

---

## Tech Stack

* **Frontend**: React (Vite), Tailwind CSS, Shadcn/ui, i18next.
* **Backend**: Python, FastAPI, Pydantic.
* **AI Engine**: OpenAI API (Generative AI Integration).
* **DevOps**: Docker, Multi-stage Builds, Docker Compose.

---

## API Documentation
The backend service provides RESTful API endpoints to handle communication between the frontend and the AI logic.

**POST** ```/api/calculate```

Processes user financial data and retrieves AI-generated tax advice.

| Parameter | Type | Description |
| ---------- | ---------- | ---------- |
| `gross_salary` | `float` | [cite_start]The user's monthly or annual gross income. |
| `sector` | `string` | The employment sector, categorized as Private or Public. |
| `children` | `int` | The total number of dependents used to calculate tax-free limits. |
| `is_married` | `boolean` | Marital status used for further tax-free limit adjustments. |
| `lang` | `string` | The preferred language for the AI response (el for Greek, en for English). |

## Response Schema:

Returns a JSON object containing the calculated net income, tax deductions, and the ```ai_advice``` string.

## AI Integration

The core of the application is its integration with the OpenAI generative AI model.
* **Data Flow**: User inputs from the frontend are validated and sent to the Python backend.
* **Contextual Prompting**: The backend constructs a professional prompt for the AI, including the calculated tax results for the model to analyze.
* **Bilingual Processing**To optimize performance and cost, the AI is instructed to provide a dual-language response separated by a delimiter ```(###)```, which the frontend then parses based on the user's active language.

## Installation & Deployment

This section provides comprehensive instructions for setting up and running the **Intelligent Tax Filing Web Application**. You can choose between the streamlined Docker deployment or a manual local setup for development purposes.

## Option 1: Docker

Τhis method uses containerization to ensure the application runs smoothly across different environments.

### 1. Prerequisites

* **Docker Desktop** (or Docker Engine) installed on your machine.
* **Docker Compose** (included with Docker Desktop).

### 2. Environment Configuration

Before building the container, you must configure the OpenAI API key.

1. Navigate to the ```backend/``` directory.
2. Create a file named ```.env```.
3. Add your secret key in the following format:
```OPENAI_API_KEY=your_actual_api_key_here```

### 3. Build and Launch

Open your terminal in the root directory (where ```docker-compose.yml``` is located) and execute:
```bash
docker-compose up --build
```

### 4. Verification

1. Access the UI: Once the build finishes, open http://localhost:8000 in your browser.
2. Stop the App: Press ```Ctrl+C``` or run ```docker-compose down```.

## Option 2: Local Development

If you prefer to run the components separately for active development, follow these manual steps.

### 1. Backend Setup (Python & FastAPI)

The backend manages the server-side logic and AI integration.

1. Navigate to the backend folder: ```cd backend```.
2. Create a virtual environment:

```Bash
python -m venv venv
venv\Scripts\activate
```
3. Install dependencies:

```Bash
pip install -r requirements.txt
```
4. Launch the server:

```Bash
uvicorn main:app --reload
```

The API will be available at http://127.0.0.1:8000.

### 2. Frontend Setup (React & Vite)

The frontend provides the responsive user interface for tax data entry.

1. Navigate to the frontend folder: cd frontend.
2. Install packages:

```Bash
npm install
```
3. Start development server:

```Bash
npm run dev
```
The UI will be available at http://localhost:5173.

