import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Welcome to Y.A.R.A</h1>
        <p>Join us and explore amazing opportunities!</p>
        <div style={{ marginTop: "1.5rem" }}>
          <a
            href="/auth/signIn"
            className="m-2 px-8 py-3 text-primary rounded-full bg-secondary border hover:text-secondary hover:bg-primary font-mono"
          >
            Login
          </a>
          <a
            href="/auth/signup"
            className="m-2 px-8 py-3 text-white rounded-full bg-green-600 border hover:text-green-600 hover:bg-secondary font-mono"
          >
            Signup
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {" "}
        <p>&copy; {new Date().getFullYear()} Y.A.R.A</p>
      </footer>
    </div>
  );
}
