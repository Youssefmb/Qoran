import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function RouterError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-center p-5">
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div className="text-center p-5">
      <h1>Unexpected error</h1>
      <p>{error?.message || "Something went wrong"}</p>
    </div>
  );
}
