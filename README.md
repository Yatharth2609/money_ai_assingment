# Portfolio Analytics Dashboard

A modern full-stack application for analyzing and visualizing investment portfolios, specifically designed for the Indian market.

## Features

- Dynamic charts for investment performance visualization
- Strategy performance analysis with NSE stocks
- Real-time market updates
- Responsive design with modern UI/UX
- Strategy comparison tools

## Tech Stack

### Frontend
- React.js with TypeScript for type safety
- Material UI for consistent design system
- Framer Motion for smooth animations
- Recharts for responsive data visualization
- React Query for efficient data fetching and caching

### Backend
- Node.js/Express with TypeScript
- MongoDB for flexible data storage
- Mongoose for data modeling
- Express Router for API routing
- Morgan for request logging

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone [<repository-url>](https://github.com/Yatharth2609/money_ai_assingment.git)
   cd money_ai
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Set up environment variables:
   
   Backend (.env):
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/money_ai
   NODE_ENV=development
   ```

   Frontend (.env):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. Start MongoDB:
   ```bash
   mongod
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

4. Access the application at `http://localhost:3000`

## Project Structure

```
money_ai/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── api/            # API integration
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── mockData/      # Mock data for development
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── backend/               # Express backend server
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   └── utils/        # Utility functions
└── README.md             # Project documentation
```

## Design Choices and Implementation Details

### 1. User Interface Design
- Modern, clean interface with Material UI components
- Responsive design that works across devices
- Smooth animations for better user experience
- Dark mode support for reduced eye strain
- Interactive charts with tooltips and hover effects

### 2. Performance Optimization
- React Query for efficient data fetching and caching
- Lazy loading of components
- Memoization of expensive calculations
- Optimized chart rendering with debounced updates

### 3. Data Visualization
- Area charts for portfolio performance
- Bar charts for asset allocation
- Pie charts for sector distribution
- Custom tooltips with formatted values
- Responsive chart sizes

### 4. State Management
- React Query for server state
- React Context for theme and user preferences
- Local state for component-specific data

### 5. Error Handling
- Graceful fallbacks for loading states
- Error boundaries for component failures
- Meaningful error messages
- Default values for undefined data

### 6. Security Considerations
- Input validation on both frontend and backend
- CORS configuration
- Rate limiting on API endpoints
- Secure HTTP headers

## Assumptions Made

1. **Data Availability**
   - Portfolio data is updated daily
   - Stock prices are end-of-day values
   - Historical data is available for at least 6 months

2. **Technical Environment**
   - Modern browser support required
   - Stable internet connection
   - Minimum screen resolution of 768px

3. **Performance**
   - Maximum dataset size of 1000 records for charts
   - API response times under 500ms
   - Chart interactions should be smooth at 60fps

## Future Improvements

1. **Features**
   - Real-time stock price updates
   - Portfolio rebalancing suggestions
   - Tax harvesting opportunities
   - Mobile app version

2. **Technical**
   - Implement WebSocket for live updates
   - Add end-to-end testing
   - Implement PWA capabilities
   - Add export functionality for reports
