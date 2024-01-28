# Pizza Shop Application
This application simulates the behavior of a pizza restaurant, allowing users to place orders, track the progress of their orders, and manage them through various stages until they are ready for pickup.
# hostng link (sandbox)- https://qy86cc.csb.app/
# hosting link- https://main--voluble-tulumba-667f8a.netlify.app/
# Requirements
Node.js
React
Redux
# Installation
Clone the repository:

git clone <repository-url>

# Navigate to the project directory:

cd Doughlicious
# Install dependencies:

npm install
# Run the application:

# npm start
# Overview
This pizza shop application consists of two main sections:

### Pizza Stages Section: Displays each stage of pizza orders with corresponding details.
### Main Section: Provides an overview of all pizza orders in progress, including their remaining time and order ID.
# Features
### Placing Orders: Users can place pizza orders through a form with options for type, size, and base.
### Order Limit: The restaurant can handle a maximum of 10 orders at a time. If the limit is reached, it displays a message indicating that no more orders can be taken.
### Order Stages: Each order progresses through stages: Order Placed, Order in Making, Order Ready, and Order Picked.
### Time Tracking: Orders are highlighted in red if they remain in the same stage for more than 3 minutes. Time spent in each stage is displayed on the pizza card.
### Main Display: Provides an overview of orders in progress, including their remaining time and order ID. It also displays the total number of orders delivered today.
### Cancellation: Orders can be canceled at any time before they reach the Order Ready stage from the Main section.
### Manual Stage Progression: Orders can be moved from one stage to another manually using buttons.
### Different Making Times: Different sizes of pizzas have different making times, affecting the highlighting of overdue orders.
### Redux Integration: The application uses Redux for state management to manage the flow of data across components effectively.

