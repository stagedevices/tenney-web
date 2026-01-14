import { useEffect } from "react";

export default function DocsRedirect() {
  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || "/";
    window.location.assign(`${baseUrl}docs/`);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-sm text-slate-600 dark:text-slate-300">
      Redirecting to the docs… If you are not redirected, use this link: {" "}
      <a className="text-tenney-blue" href={`${import.meta.env.BASE_URL}docs/`}>
        Tenney Docs
      </a>
      .
    </main>
  );
}
