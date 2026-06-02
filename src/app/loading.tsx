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
      <div
        className="
          flex
          flex-col
          items-center
          gap-4
        "
      >

        {/* Logo */}
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-brand-500
            flex
            items-center
            justify-center
            animate-pulse
            shadow-lg
          "
        >
          <span
            className="
              text-white
              font-bold
              text-2xl
            "
          >
            R
          </span>
        </div>

        {/* Loading text */}
        <p
          className="
            text-sm
            text-neutral-400
            animate-pulse
          "
        >
          Ramiorix...
        </p>

      </div>
    </div>
  );
}