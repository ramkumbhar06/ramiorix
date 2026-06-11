// src/app/loading.tsx

export default function Loading() {
  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-black/10
        backdrop-blur-md
      "
    >
      <div className="flex flex-col items-center gap-4">

        <div className="flex flex-col items-center animate-pulse">

          <span
            className="
              font-logo
              text-5xl
              tracking-tight
              text-white
            "
          >
            Ramiorix
          </span>

          <span
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-brand-400
              mt-1
            "
          >
            Learn • Prepare • Succeed
          </span>

        </div>

        <p
          className="
            text-sm
            text-neutral-400
          "
        >
          Loading Ramiorix...
        </p>

      </div>
    </div>
  );
}