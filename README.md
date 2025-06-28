## Logic For Sell Count

In the backend setup, there is a service for the purchase of books. When a buyer purchases a book, after the purchase has been successfully created in the database, an update is done on the sellCount by 
finding the bookId and increase the sell count. The count is increased in a way that, the quantity that is associated with the purchase of the book is added to the current sell count of the book.
For instance, if a buyer buys a book with quantity of 3, then the current sell count of the that book is incremented with quantity(that is 3). Incrementing the sell count after successful purchase make sure 
that the sell count is always in sync with the actaul sold number of books.

## Mechanism for Sending Email Notification

The email notification sending there for the buyer side and author side, like when a buyer has purchased a book, then the author has to be notified that a purchase has taken place. And also the author has to recieve
an email showing the revenue stats of the current month. And in the buyer side, the buyer has to recieve email when the authors has published new books. The mechanisms mainly work on the cron job.
So in the author email part, the email when the user purchases a book is implemented in a way that, the cron jobs runs daily and sends the author the details of the purchases that has occured on the previous day.
This prevents high volume of emails to the author inbox as the purchase of books can go to a high number sometimes. So every 24 hours, a helper function that checks the purchase collection to get the purcase details 
that has occured in the last 24 hours and the cron job sends this data as email to the author. The monthly email regarding the revenue tracking is also done with the cron job and is send on 1st of every month which
includes the total revenue of that month.
Then in the buyer side, to handle the email, I have created a helper function that fetches the recent books(last 24 hours) that are added by any author. Now the list of the user is fetched on the basis of the role
of the user and then if there is any data from the helper function that finds the recent books, then the cron job schedules a email and this email is scheduled for every 24 hours. If there is data in recent books,
the email is to the buyers, else skipped sending emails.
To make sure only only 100 emails are sent in every one second, I have divided the buyers array which will have the all users who are buyers and are divided to 100 each. Then when sending emails, a setTimeout for 60
secons is given so that when sending the mails, it is batched and made sure only 100 emails are send in one minute.

## Database Design

I chose mongodb as the db for this project as it aligns better with my mern stack architecture and is flexible in iteration on schema.
The collection I have are ;
- Users : stores user data and role that handles the authorizations.
- Books : stores the book data and the sell count which needs updation according to the purchase
- Purchases : stores the purchase related data and is used to track which buyere bought which book and its quantity, total amount.
- Revenue : stores the revenue of the books which is used to calcualate revenue of each author based on the purchases that has occured.
- Counter : this is used as a helper for the Books and Purchase collection to handle race conditons and make sure the ids of the books are unique from all other bookIds following a unique format: 'book-count'
  and similarly the purchase id is unique from all other purchase id following a unique format : 'Year-Month-countOfPurchase'. 
