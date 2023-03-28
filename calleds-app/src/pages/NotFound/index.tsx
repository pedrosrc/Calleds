export default function NotFound() {
  
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        
        
        <main className="grid min-h-full place-items-center bg-#04013b py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-#fff sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Desculpe, página não encontrada.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Ir para a Home
              </a>
            </div>
          </div>
        </main>
      </>
    )
  }
  