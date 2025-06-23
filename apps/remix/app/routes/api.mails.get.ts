import { LoaderFunction } from "@remix-run/node";
import { getEmailsByMessageTo } from "database/dao";
import { getWebTursoDB } from "database/db";

export const loader: LoaderFunction = async ({ request }) => {
  // 从URL获取查询参数
  const url = new URL(request.url);
  const mailbox = url.searchParams.get("mailbox");
  
  if (!mailbox) {
    return new Response("Missing mailbox parameter", { status: 400 });
  }

  const db = getWebTursoDB(
    process.env.TURSO_DB_URL as string,
    process.env.TURSO_DB_RO_AUTH_TOKEN as string
  );

  try {
    const mails = await getEmailsByMessageTo(db, mailbox);
    return mails;
  } catch (error) {
    console.error("Error fetching emails:", error);
    return new Response("Error fetching emails", { status: 500 });
  }
};