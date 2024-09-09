import { Outlet } from "react-router-dom";

export function Default() {
  return (
    <div className="min-h-screen">
      <nav className="mb-4 shadow">
        <div className="flex justify-between h-full max-w-screen-xl p-4 mx-auto w-100">
          <a href="/" className="flex gap-1 text-2xl">
            <span className="font-black">Serasa</span>
            <span>Challenge</span>
          </a>
          <div>
            <a
              href="/producers"
              className="text-blue-600 hover:underline underline-offset-4"
            >
              Produtores
            </a>
          </div>
        </div>
      </nav>
      <main className="h-full max-w-screen-xl px-4 mx-auto w-100">
        <Outlet />
      </main>
    </div>
  );
}
