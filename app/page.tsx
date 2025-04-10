import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to /contacts
  redirect("/contacts");

  return null; // No content to display as it redirects
}
