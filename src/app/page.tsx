import App from "../App";

export default function Page() {
  const apiUrl =
    process.env.REDUCTO_CONTENT_API_URL ||
    process.env.NEXT_PUBLIC_REDUCTO_CONTENT_API_URL ||
    "";
  return <App apiUrl={apiUrl} />;
}
