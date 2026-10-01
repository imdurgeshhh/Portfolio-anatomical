export default function Footer() {
  return (
    <footer className="w-full py-12 px-[max(5.6vw,2rem)] flex justify-between items-center z-40 mt-auto border-t border-black/5 dark:border-white/10">
      <p className="font-albert text-sm text-black/60 dark:text-white/60">
        &copy; {new Date().getFullYear()} Durgesh. All rights reserved.
      </p>
      <p className="font-fragment text-xs text-black/60 dark:text-white/60 text-right leading-loose tracking-widest uppercase hidden sm:block">
        Building the<br />
        next version<br />
        in public
      </p>
    </footer>
  );
}
