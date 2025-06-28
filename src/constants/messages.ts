export const MESSAGES = {
  USER: {
    CREATED: "User created successfully",
    EXISTS: "User with this email already exists",
    EMAIL_REQUIRED: "Please enter a valid email",
    PASSWORD_REQUIRED: "Please enter a valid password",
    PASSWORD_NOT_MATCH: "Password does not match",
    NOT_FOUND: "User not found",
    INVALID_CREDENTIALS: "Invalid email or password",
    LOGIN_SUCCESS: "User login successful",
    UNAUTHORIZED: "Unauthorized",
  },
  BOOK: {
    CREATED: "Book created successfully",
    TITLE_REQUIRED: "Please enter a valid title",
    TITLE_EXISTS: "Book with this title already exists",
    DESCRIPTION_REQUIRED: "Please enter a valid description",
    PRORER_PRICE: "Please enter a price rangin in 100 - 1000",
    NO_AUTHOR: "Author is required",
    NOT_FOUND: "Book not found",
    FOUND: "Book found",
  },
  SERVER: {
    ERROR: "Something went wrong",
  },
  TOKEN: {
    NO_ACCESS_TOKEN: "No access token found",
    INVALID_ACCESS_TOKEN: "Invalid access token",
  },
  PURCHASE: {
    CREATED: "Purchase completed successfully",
    NO_ID_QUANTITY: "Book ID and quantity are required",
    FETCHED: "User purchases fetched",
  },
  REVENUE: {
    FETCHED: "Revenue fetched successfully",
    FETCHED_TOTAL: "Total revenue fetched successfully",
  },
};
