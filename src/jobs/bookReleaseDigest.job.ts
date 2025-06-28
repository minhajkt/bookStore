import cron from "node-cron";
import { getRecentBooks } from "../utils/recentBooks.utils";
import { sendNewBookReleaseEmails } from "./bulkNewBookEmail.job";

cron.schedule(
  "0 10 * * *",
//   "*/5 * * * *",
  async () => {
    console.log("Starting new book release cron...");

    const recentBooks = await getRecentBooks(); 

    const simplifiedBooks = recentBooks.map((book) => ({
      title: book.title,
      author:
        Array.isArray(book.authors) && book.authors.length > 0
          ? (book.authors[0] as any)?.name ?? "Unknown Author"
          : "Unknown Author",
    }));

      await sendNewBookReleaseEmails(simplifiedBooks);
    

    console.log("Book release digest job completed.");
  },
  {
    timezone: "Asia/Kolkata",
  }
);
